import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { timer } from 'rxjs/internal/observable/timer';
import { ActivatedRoute, Router } from '@angular/router';
import { SignalRService } from '@services/signal-r.service';
import { environment } from '@environment';
import { HttpClient } from '@angular/common/http';
import { Subscription, Subject } from 'rxjs';
import { StorageService } from '@services/storage.service';
import { MatDialog } from '@angular/material';
import { WaitingModalComponent } from './waiting-modal/waiting-modal.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public questionId: number;
  public question: any;
  public sumbitted: boolean;

  constructor(
    private router: Router,
    public signalRService: SignalRService,
    public storageService: StorageService,
    private http: HttpClient,
    private zone: NgZone,
    private dialog: MatDialog
  ) {
    this.signalRService.addQuestionsListener();
    this.signalRService.question$.subscribe(question => {
      this.dialog.closeAll();
      console.log(question);
      if (!question) {
        return;
      }
      if (question && question.questionId === 0) {
        this.zone.run(() => {
          this.router.navigateByUrl('final');
        });
      }
      this.question = question;
      this.sumbitted = false;
    });
  }

  ngOnInit() {
    this.sumbitted = false;
  }

  public submitAnswer(answerId) {
    if (this.sumbitted === true) {
      return;
    }
    this.sumbitted = true;

    let points = 0;
    if (this.question.correctAnswerId === answerId) {
      points = 2;
    } else if (this.question.correctAnswerId !== answerId) {
      points = -1;
    }
    const total = this.storageService.getScore(points);

    const answer = {
      QuestionId: this.questionId,
      AnswerId: answerId,
      ParticipantId: this.storageService.getUserId(),
      Time: 0,
      Score: total,
      GameId: this.storageService.getGameId()
    };
    this.signalRService.broadcastAnswer(answer);
    this.openDialog();
  }

  public openDialog() {
    this.dialog.open(WaitingModalComponent, {
      height: '400px',
      width: '400px',
      hasBackdrop: true,
      disableClose: true
    });
  }

  private getQuestions() {
    this.http.get(`${environment.webApiUrl}/api/game/getQuestion`)
      .subscribe(question => {
      },
        (err) => {
        });
  }

  public isCorrect(answerId) {
    if (answerId === this.question.correctAnswerId) {
      return true;
    }
    return false;
  }

}

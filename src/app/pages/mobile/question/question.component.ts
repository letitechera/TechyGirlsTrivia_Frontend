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
export class QuestionComponent implements OnInit, OnDestroy {

  public timer = 20;
  public questionId: number;
  public question: any;
  public subscribe: Subscription;
  public sumbitted: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public signalRService: SignalRService,
    public storageService: StorageService,
    private http: HttpClient,
    private zone: NgZone,
    private dialog: MatDialog
  ) {
    this.sumbitted = false;
    this.route.params.subscribe(params => {
      this.questionId = +params['id'];
      this.getQuestion(this.questionId);
    });
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  public getQuestion(questionId) {
    const headers = this.signalRService.getHeaders();
    const url = `${environment.webApiUrl}/api/game/question/${questionId}`;
    return this.http.get(url, { headers })
      .subscribe((data: any) => {
        if (data != null) {
          this.question = data;

          const source = timer(1000, 1000);
          this.subscribe = source.subscribe(val => {
            this.timer--;
            if (this.timer === -1) {
              questionId++;
              this.subscribe.unsubscribe();
              this.zone.run(() => {
                this.timer = 20;
                this.router.navigate(['question/', questionId])
              });
            }
          });
        }
      },
        (err) => {
          console.log(err);
        });
  }

  public submitAnswer(answerId){
    this.sumbitted = true;
    const answer = {
      QuestionId: this.questionId,
      AnswerId: answerId,
      ParticipantId: this.storageService.getUserId(),
      Time: this.timer
    };
    this.signalRService.broadcastAnswer(answer);
    this.openDialog();
  }

  public openDialog() {
    const dialogRef = this.dialog.open(WaitingModalComponent, {
      height: '400px',
      width: '400px',
      hasBackdrop: true
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  public isCorrect(answerId){
    if(answerId == this.question.correctAnswerId){
      return true;
    }
    return false;
  }

}

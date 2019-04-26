import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignalRService } from '@services/signal-r.service';
import { environment } from '@environment';
import { HttpClient } from '@angular/common/http';
import { timer } from 'rxjs/internal/observable/timer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-public-question',
  templateUrl: './public-question.component.html',
  styleUrls: ['./public-question.component.scss']
})
export class PublicQuestionComponent implements OnInit {

  public questionId: number;
  public question: any;

  constructor(
    private router: Router,
    public signalRService: SignalRService,
    private zone: NgZone,
  ) { }

  ngOnInit() {
    this.signalRService.addQuestionsListener();

    this.signalRService.question$.subscribe(question => {
      console.log(question);
      if (!question) {
        return;
      }
      if (question && question.questionId === 0) {
        this.zone.run(() => {
          this.router.navigateByUrl('screen/podium');
        });
      }
      this.question = question;
    });
  }
}

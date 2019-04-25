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
export class PublicQuestionComponent implements OnInit, OnDestroy {

  public timer = 20;
  public questionId: number;
  public question: any;
  public subscribe: Subscription;

  constructor(
    private router: Router,
    public signalRService: SignalRService,
    private zone: NgZone,
  ) { }

  ngOnInit() {
    this.signalRService.addQuestionsListener();
    // this.signalRService.addAnswerListener();

    this.signalRService.question$.subscribe(question => {
        this.question = question;
        const source = timer(1000, 1000);
        this.subscribe = source.subscribe(val => {
          this.timer--;
          if (this.timer === -1) {
            this.subscribe.unsubscribe();
            this.zone.run(() => {
              this.timer = 20;
              if (question === null) {
                this.router.navigateByUrl('podium');
              }
            });
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}

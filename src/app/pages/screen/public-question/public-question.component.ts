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
    private route: ActivatedRoute,
    private router: Router,
    public signalRService: SignalRService,
    private http: HttpClient,
    private zone: NgZone,
  ) { }

  ngOnInit() {
    this.signalRService.addAnswerListener();
    this.route.params.subscribe(params => {
      this.questionId = +params.id;
      this.getQuestion(this.questionId);
    });
  }

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
                if (questionId === 20) {
                  this.router.navigateByUrl('podium');
                } else {
                  this.router.navigate(['screen/question/', questionId]);
                }
              });
            }
          });
        }
      },
        (err) => {
          console.log(err);
        });
  }
}

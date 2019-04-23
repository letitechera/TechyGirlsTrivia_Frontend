import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignalRService } from '@services/signal-r.service';
import { environment } from '@environment';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  public value: number;

  constructor(
    public signalRService: SignalRService,
    private router: Router,
    private http: HttpClient
  ) {
    this.getTimer();

    this.signalRService.timerValue$.subscribe(timer => {
      this.value = timer;
      if (timer === -1) {
        this.router.navigateByUrl('question');
      }
    });

  }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addStartTimerListener();
  }

  private getTimer() {
    const headers = this.signalRService.getHeaders();
    const url = `${environment.webApiUrl}/api/game/timer`;
    return this.http.get(url, { headers })
      .subscribe((data) => {
        // this.router.navigateByUrl('waiting');
      },
        (err) => {
          console.log(err);
        });
  }
}

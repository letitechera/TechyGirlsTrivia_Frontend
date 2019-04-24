import { Component, OnInit, NgZone } from '@angular/core';
import { ParticipantModel } from '@models/participant';
import { SignalRService } from '@services/signal-r.service';
import { Router } from '@angular/router';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY } from '@angular/cdk/overlay/typings/overlay-directives';
import { timer } from 'rxjs/internal/observable/timer';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.scss']
})
export class WaitingComponent implements OnInit {

  public startGame: boolean;
  public timer = 3;

  constructor(
    public signalRService: SignalRService,
    private router: Router,
    private zone: NgZone
  ) {
    this.signalRService.addStartGameListener();
    this.signalRService.startGame$.subscribe(start => {
      if (start) {
        this.startGame = true;
        const source = timer(1000, 1000);
        const subscribe = source.subscribe(val => {
          this.timer--;
          if (this.timer === -1) {
            subscribe.unsubscribe();
            this.zone.run(() => {
              this.router.navigate(['screen/question/', 1]);
            });
          }
        });
      }
    });
  }

  ngOnInit() {
  }

}

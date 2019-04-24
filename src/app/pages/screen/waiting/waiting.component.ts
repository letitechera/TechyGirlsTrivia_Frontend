import { Component, OnInit, NgZone } from '@angular/core';
import { ParticipantModel } from '@models/participant';
import { SignalRService } from '@services/signal-r.service';
import { Router } from '@angular/router';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY } from '@angular/cdk/overlay/typings/overlay-directives';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.scss']
})
export class WaitingComponent implements OnInit {

  constructor(
    public signalRService: SignalRService,
    private router: Router,
    private zone: NgZone
  ) {
    this.signalRService.addStartGameListener();
    this.signalRService.startGame$.subscribe(start => {
      if (start) {
        console.log("EMPIEZA")
      }
    });
  }

  ngOnInit() {
  }

}

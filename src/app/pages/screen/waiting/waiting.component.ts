import { Component, OnInit } from '@angular/core';
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

  public participantsList: ParticipantModel[];

  constructor(
    public signalRService: SignalRService,
    private router: Router,
  ) { 
    this.signalRService.startConnection();
    this.signalRService.addRegisterListener();
    this.signalRService.participants$.subscribe(participants => {
      if (participants && participants.length > 0) {
        this.participantsList = participants;
      } else {
      this.router.navigateByUrl('screen/welcome');
      }
    });
    this.signalRService.startGame$.subscribe(start => {
      if (start) {
        //start timer
      }
    });
  }

  ngOnInit() {
  }

}

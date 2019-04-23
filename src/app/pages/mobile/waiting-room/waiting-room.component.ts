import { Component, OnInit } from '@angular/core';
import { SignalRService } from '@services/signal-r.service';
import { Router } from '@angular/router';
import { ParticipantModel } from '@models/participant';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss']
})
export class WaitingRoomComponent implements OnInit {

  public participantsList: any[];

  constructor(
    public signalRService: SignalRService,
    private router: Router,
  ) { 
    this.signalRService.startConnection();
    this.signalRService.addRegisterListener();
    this.signalRService.addStartGameListener();

    this.signalRService.participants$.subscribe(participants => {
      if (participants && participants.length > 0) {
        this.participantsList = participants;
      } else {
      this.router.navigateByUrl('');
      }
    });
    
    this.signalRService.startGame$.subscribe(start => {
      if (start == true) {
        this.router.navigateByUrl('timer');
      }
    });
  }

  ngOnInit() {
  }
}

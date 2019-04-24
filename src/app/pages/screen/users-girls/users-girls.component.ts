import { Component, OnInit, NgZone } from '@angular/core';
import { SignalRService } from '@services/signal-r.service';

@Component({
  selector: 'app-users-girls',
  templateUrl: './users-girls.component.html',
  styleUrls: ['./users-girls.component.scss']
})
export class UsersGirlsComponent implements OnInit {
  
  public participantsList: any[];

  constructor(
    public signalRService: SignalRService,
    private zone: NgZone
  ) { 
    this.signalRService.addRegisterListener();
    this.signalRService.participants$.subscribe(participants => {
      if (participants && participants.length > 0) {
        this.participantsList = participants;
      }
    });
  }

  ngOnInit() {

  }

}

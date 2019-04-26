import { Component, OnInit, NgZone } from '@angular/core';
import { SignalRService } from '@services/signal-r.service';
import { StorageService } from '@services/storage.service';

@Component({
  selector: 'app-final-results',
  templateUrl: './final-results.component.html',
  styleUrls: ['./final-results.component.scss']
})
export class FinalResultsComponent implements OnInit {

  public participants: any[];
  public place: number;
  private current: any;

  constructor(
    public signalRService: SignalRService,
    public storageService: StorageService,
  ) { }

  ngOnInit() {
    // const gameid = this.storageService.getGameId();
    // this.signalRService.broadcastGetAllUsers(gameid);
    // this.signalRService.addGetAllUsersListener();
    // this.signalRService.allUsers$.subscribe(users => {
    //   if (users && users.length > 0) {
    //     this.participants = users;
    //     this.participants.forEach(element => {
    //       if (element.participantId === this.storageService.getUserId()) {
    //         this.current = element;
    //       }
    //     });
    //   }
    // });
  }

}

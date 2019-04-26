import { Component, OnInit } from '@angular/core';
import { SignalRService } from '@services/signal-r.service';
import { StorageService } from '@services/storage.service';

@Component({
  selector: 'app-podium',
  templateUrl: './podium.component.html',
  styleUrls: ['./podium.component.scss']
})
export class PodiumComponent implements OnInit {

  public winners: any[];

  constructor(
    public signalRService: SignalRService,
    public storageService: StorageService,
  ) {
    const gameid = this.storageService.getGameId();
    this.signalRService.broadcastFinalResults(gameid);
    this.signalRService.addResultsListener();
    this.signalRService.winners$.subscribe(winners => {
      if (winners && winners.length > 0) {
        this.winners = winners;
        console.log(this.winners);
      }
    });
  }
  ngOnInit() {
  }

}

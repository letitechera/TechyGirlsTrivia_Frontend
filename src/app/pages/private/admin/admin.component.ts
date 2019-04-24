import { Component, OnInit } from '@angular/core';
import { SignalRService } from '@services/signal-r.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    public signalRService: SignalRService,
  ) {
    this.signalRService.startConnection();
  }

  ngOnInit() {
  }

  public startGame() {
    console.log('Broadcast Start!');
    this.signalRService.broadcastStartGame(true);
  }

}

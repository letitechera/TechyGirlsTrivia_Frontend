import { Component, OnInit } from '@angular/core';
import { SignalRService } from '@services/signal-r.service';
import { environment } from '@environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    public signalRService: SignalRService,
    private http: HttpClient,
  ) {
    this.signalRService.startConnection();
  }

  ngOnInit() {
  }

  public startGame() {
    console.log('Broadcast Start!');
    this.signalRService.broadcastStartGame(true);
  }

  public getQuestions() {
    this.http.get(`${environment.webApiUrl}/api/game/getQ`)
      .subscribe(question => {
      },
        (err) => {
        });
  }
}

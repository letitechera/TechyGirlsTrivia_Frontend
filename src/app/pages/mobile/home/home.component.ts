import { Component, OnInit } from '@angular/core';
import { environment } from '@environment';
import { SignalRService } from '@services/signal-r.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public signalRService: SignalRService, private http: HttpClient) { }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addGetTimerListener();
    this.startHttpRequest();
  }
  private startHttpRequest = () => {
    this.http.get(`${environment.webApiUrl}/api/game`)
      .subscribe(res => {
        console.log(res);
      });
  }

}

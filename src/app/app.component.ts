import { Component, OnInit } from '@angular/core';
import { SignalRService } from './services/signal-r.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  [x: string]: any;
  constructor(public signalRService: SignalRService, private http: HttpClient) { }

  ngOnInit(): void {
    // this.signalRService.startConnection();
    // this.signalRService.addGetTimerListener();
    // this.startHttpRequest();
  }
  // private startHttpRequest = () => {
  //   this.http.get(`${environment.webApiUrl}/api/game`)
  //     .subscribe(res => {
  //       console.log(res);
  //     });
  // }
}

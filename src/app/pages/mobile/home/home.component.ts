import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from '@environment';
import { SignalRService } from '@services/signal-r.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public loading: boolean;
  public sessionForm: FormGroup;

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

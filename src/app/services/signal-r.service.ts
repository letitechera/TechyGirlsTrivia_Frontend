import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { QuestionModel } from '../models/question';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  public data: QuestionModel;
  public broadcastedData: QuestionModel;
  public timer :number=0;
  private hubConnection: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.webApiUrl}/game`)
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
      localStorage.setItem('gameId', 'newgame')
  }

  public addGetTimerListener = () => {
    this.hubConnection.on('getTimer', (data) => {
      this.timer = this.timer + data;
      console.log('listener timer', this.timer);
    });
  }

  public addRegisterListener = () => {
    this.hubConnection.on('registerUser', (data) => {
      this.data = data;
      console.log('service listener register');
      console.log(data);
    });
  }

public addGetQuestionListener=()=>{
  this.hubConnection.on('sendquestion',(data)=>{
    console.log('service listener sendQuestion');
    this.data = data;
    console.log('listener question', this.data);
    
  })
}
  public broadcastChartData = () => {
    this.hubConnection.invoke('broadcastdata', this.data)
    .catch(err => console.error(err));
  }

  public addBroadcastChartDataListener = () => {
    this.hubConnection.on('broadcastdata', (data) => {
      this.broadcastedData = data;
    });
  }

  constructor() { }
}

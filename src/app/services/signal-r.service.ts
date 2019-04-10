import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { QuestionModel } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  public data: QuestionModel;
  private hubConnection: signalR.HubConnection;
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:60967/game')
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public addTransferDataListener = () => {
    this.hubConnection.on('transferdata', (data) => {
      this.data = data;
      console.log(data);
    });
  }

  constructor() { }
}

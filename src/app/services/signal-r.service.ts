import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { QuestionModel } from '../models/question';
import { environment } from '@environment';
import { ParticipantModel } from '@models/participant';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private participantsListSubject = new BehaviorSubject<ParticipantModel[]>(null);
  public participants$ = this.participantsListSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<ParticipantModel>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private startGameSubject = new BehaviorSubject<boolean>(null);
  public startGame$ = this.startGameSubject.asObservable();

  private timerValueSubject = new BehaviorSubject<number>(null);
  public timerValue$ = this.timerValueSubject.asObservable();

  public startTimer: number;

  /* CONNECTION */

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

  /* LISTENERS */

  public addGetTimerListener = () => {
    this.hubConnection.on('getTimer', (data) => {
      // this.data = data;
    });
  }

  public addRegisterListener = () => {
    console.log('service listener register');
    this.hubConnection.on('registerUser', (data) => {
      this.participantsListSubject.next(data);
    });
  }

  public addStartGameListener = () => {
    this.hubConnection.on('broadcastStart', (data) => {
      console.log('Empieza el juego!!!! '+ data)
      this.startGameSubject.next(data);
    });
  }

  public addStartTimerListener = () => {
    this.hubConnection.on('startTimer', (data) => {
      this.startTimer --;
      this.timerValueSubject.next(this.startTimer);
      console.log(this.startTimer);
      
    });
  }

  /* BROADCASTERS */

  public broadcastStartGame = (start) => {
    this.hubConnection.invoke('broadcastStart', start)
    .catch(err => console.error(err));
  }

  constructor() { 
    this.startTimer = 4;
  }
}

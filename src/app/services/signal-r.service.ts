import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { QuestionModel } from '../models/question';
import { environment } from '@environment';
import { ParticipantModel } from '@models/participant';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

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

  private questionSubject = new BehaviorSubject<any>(null);
  public question$ = this.questionSubject.asObservable();

  private answerSubject = new BehaviorSubject<any>(null);
  public answer$ = this.answerSubject.asObservable();

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
    localStorage.setItem('gameId', 'newgame');
  }

  /* LISTENERS */

  public addGetTimerListener = () => {
    this.checkConnection();
    this.hubConnection.on('getTimer', (data) => {
      // this.data = data;
    });
  }

  public addRegisterListener = () => {
    this.checkConnection();
    this.hubConnection.on('registerUser', (data) => {
      this.participantsListSubject.next(data);
    });
  }

  public addStartGameListener = () => {
    this.checkConnection();
    this.hubConnection.on('broadcastStart', (data) => {
      this.startGameSubject.next(data);
    });
  }

  public addQuestionsListener = () => {
    this.checkConnection();
    this.hubConnection.on('getQuestion', (data) => {
      this.questionSubject.next(data);
    });
  }

  public addAnswerListener = () => {
    this.checkConnection();
    this.hubConnection.on('broadcastAnswer', (data) => {
      this.answerSubject.next(data);
    });
  }

  /* BROADCASTERS */

  public broadcastStartGame = (start) => {
    this.hubConnection.invoke('broadcastStart', start)
      .catch(err => console.error(err));
  }

  public broadcastAnswer = (answer) => {
    this.hubConnection.invoke('BroadcastAnswer', answer)
      .catch(err => console.error(err));
  }

  /* OTHER */

  public getHeaders() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true'
    });
    return headers;
  }

  private checkConnection() {
    if (!this.hubConnection) {
      this.router.navigateByUrl('home');
    }
  }

  constructor(
    private router: Router,
  ) { }
}

import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
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

  private winnersSubject = new BehaviorSubject<any[]>(null);
  public winners$ = this.winnersSubject.asObservable();

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

  public addRegisterListener = () => {
    this.checkConnection();
    this.hubConnection.on('registerUser', (data) => {
      this.participantsListSubject.next(data);
    });
  }

  public addStartGameListener = () => {
    this.checkConnection();
    this.hubConnection.on('startGame', (data) => {
      this.startGameSubject.next(data);
    });
  }

  public addQuestionsListener = () => {
    this.checkConnection();
    this.hubConnection.on('getQuestion', (data) => {
      this.questionSubject.next(data);
    });
  }

  public addAnswersListener = () => {
    this.checkConnection();
    this.hubConnection.on('broadcastAnswer', (data) => {
      this.answerSubject.next(data);
    });
  }

  public addResultsListener = () => {
    this.checkConnection();
    this.hubConnection.on('finalResults', (data) => {
      this.winnersSubject.next(data);
    });
  }

  /* BROADCASTERS */

  public broadcastRegister = (user) => {
    this.hubConnection.invoke('registerUser', user)
      .catch(err => console.error(err));
  }

  public broadcastStartGame = (start) => {
    this.hubConnection.invoke('startGame', start)
      .catch(err => console.error(err));
  }

  public broadcastAnswer = (answer) => {
    this.hubConnection.invoke('setAnswer', answer)
      .catch(err => console.error(err));
  }

  public broadcastFinalResults = (gameId) => {
    this.hubConnection.invoke('finalResults', gameId)
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

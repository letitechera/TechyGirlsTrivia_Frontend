import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  public setUserLocalVariables(participant) {
    localStorage.setItem('pId', participant.participantId);
    localStorage.setItem('pName', participant.participantName);
    localStorage.setItem('pImgUrl', participant.participantImg);
    localStorage.setItem('pScore', '0');
    localStorage.setItem('pTime', '0');
  }

  public getUserId() {
    return localStorage.getItem('pId');
  }

  public getGameId() {
    return localStorage.getItem('gameId');
  }

  public getScore(score: number) {
    const oldString = localStorage.getItem('pScore');
    const old = +oldString;
    const newScore = old + score;
    localStorage.setItem('pScore', newScore + '');
    return newScore;
  }

  public getTime(timer: number) {
    const oldString = localStorage.getItem('pTime');
    const old = +oldString;
    const newTime = old + timer;
    localStorage.setItem('pTime', newTime + '');
    return newTime;
  }
}

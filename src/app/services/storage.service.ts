import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }
  
  public setUserLocalVariables(participant){
    localStorage.setItem('pId', participant.participantId);
    localStorage.setItem('pName', participant.participantName);
    localStorage.setItem('pImgUrl', participant.participantImg);
  }

  public getUserInfo(){
    const user = {
      Id: localStorage.getItem('pId'),
      Name: localStorage.getItem('pName'),
      Img: localStorage.getItem('pImgUrl'),
    }
    return user;
  }
}

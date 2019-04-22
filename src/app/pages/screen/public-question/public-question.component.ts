import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '@environment';
import { SignalRService } from '@services/signal-r.service';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { QuestionComponent } from '@pages/mobile/question/question.component';
import { QuestionModel } from '@models/question';

@Component({
  selector: 'app-public-question',
  templateUrl: './public-question.component.html',
  styleUrls: ['./public-question.component.scss']
})
export class PublicQuestionComponent implements OnInit {

  public questionData:  QuestionModel = null;
  public loading: boolean;
  public timer:number=0;
  constructor(public signalRService: SignalRService,
    private router: Router,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.loading = true;
    this.signalRService.startConnection();
    this.signalRService.addGetQuestionListener();
    this.signalRService.addGetTimerListener();
    this.startHttpRequest();
    this.getQuestion();
  }
  private startHttpRequest = () => {
    const url = `${environment.webApiUrl}/api/game/timer`;
 
    this.http.get<QuestionModel>(url)
      .subscribe(res => {
        if (res != null) {
            console.log('timer',res);
           // this.timer = this.timer + 1;
            console.log('timer',this.timer  );
         }
         
      })
  }


  private  getQuestion() {
    const url = `${environment.webApiUrl}/api/game/question`;
    return this.http.get<QuestionModel>(url)
      .subscribe(res => {
       if (res != null) {
          this.questionData = res;
          console.log('data',this.questionData);
         }
        console.log('timer en componente' ,this.timer);
      });
  }
}



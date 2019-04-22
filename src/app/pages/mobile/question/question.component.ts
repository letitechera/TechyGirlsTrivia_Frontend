import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '@environment';
import { SignalRService } from '@services/signal-r.service';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { QuestionModel } from '@models/question';
import { AnswerModel } from '@models/Answer';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public questionData: QuestionModel;
  public answers: Array<AnswerModel>;
  
  constructor(public signalRService: SignalRService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient) {

  }

  ngOnInit() {
    
    this.signalRService.startConnection();
    this.signalRService.addGetQuestionListener();
    this.getQuestion();
  }

  handleClick(id) {
    console.log('Click!', id);
  }
  
  
  private  getQuestion() {
    const url = `${environment.webApiUrl}/api/game/question`;
    return this.http.get<QuestionModel>(url)
      .subscribe(res => {
       if (res != null) {
          this.questionData = res;
          this.answers = res.answers;
          console.log('data',this.questionData);
        }
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { environment } from '@environment';
import { SignalRService } from '@services/signal-r.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public loading: boolean;
  public sessionForm: FormGroup;
  public submitted: boolean;
  public userData: any;

  constructor(
    public signalRService: SignalRService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addRegisterListener();
    this.userData = {
      ParticipantId: 0,
      ParticipantName: '',
      ParticipantImg: '',
      Points: 0,
      Time: 0
    };
    this.initForm();
  }

  private initForm() {
    this.sessionForm = this.formBuilder.group({
      ParticipantImg: [''],
      ParticipantName: ['', [Validators.required]]
    });
    this.loading = false;
  }

  public submitSession() {
    this.submitted = true;
    if (!this.sessionForm.valid) {
      return;
    }
    this.loading = true;
    this.register();
  }

  private register() {
    this.setUserObject();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `${environment.webApiUrl}/api/game/register`;
    return this.http.post(url, this.userData, { headers })
      .subscribe(res => {
        console.log('api call');
        console.log(res);
      });
  }

  private setUserObject() {
    this.userData.ParticipantId = '';
    this.userData.ParticipantImg = this.sessionForm.get('ParticipantImg').value;
    this.userData.ParticipantName = this.sessionForm.get('ParticipantName').value;
    this.userData.Points = 0;
    this.userData.Time = 0;
  }

  public navigateTo(page) {
    this.router.navigateByUrl(page);
  }

}

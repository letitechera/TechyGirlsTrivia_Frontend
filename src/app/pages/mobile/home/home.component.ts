import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '@environment';
import { SignalRService } from '@services/signal-r.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from '@services/storage.service';

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
    public storageApi: StorageService,
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addGetTimerListener();
    this.startHttpRequest();
    this.initForm();
  }

  private initForm() {
    this.sessionForm = this.formBuilder.group({
      ParticipantImg: [''],
      ParticipantName: ['', [Validators.required]]
    });
    this.loading = false;
  }

  public submitUser() {
    this.submitted = true;
    if (!this.sessionForm.valid) {
      return;
    }
    this.loading = true;
    this.addUser();
  }

  private addUser() {
    this.setUserObject();
    this.storageApi.postUser(this.userData).then((data: any[]) => {
      this.navigateTo('waiting');
    }, (err) => {
      console.log(err);
    });
  }

  private setUserObject() {
    this.userData.ParticipantImg = this.sessionForm.get('ParticipantImg').value;
    this.userData.ParticipantName = this.sessionForm.get('ParticipantName').value;
  }

  public navigateTo(page) {
    this.router.navigateByUrl(page);
  }

  private startHttpRequest = () => {
    this.http.get(`${environment.webApiUrl}/api/game`)
      .subscribe(res => {
        console.log(res);
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '@environment';
import { SignalRService } from '@services/signal-r.service';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { ParticipantModel } from '@models/participant';
import { StorageService } from '@services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public loading: boolean;
  public loadingfile = false;
  public sessionForm: FormGroup;
  public submitted: boolean;
  public duplicateError: boolean;
  public error: boolean;
  public userData: any;
  public fileLoaded: boolean;
  public fileName: string;
  public fileUrl: string;
  public userImage: string;
  public formData: FormData;
  private baseurl = `${environment.webApiUrl}/api/game/uploadimage`;

  constructor(
    public signalRService: SignalRService,
    private router: Router,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addRegisterListener();
    this.signalRService.addStartGameListener();
    this.signalRService.addStartTimerListener();
    // this.signalRService.broadcastStartGame(false);

    this.formData = new FormData();
    this.userImage = environment.defaultUserImage;
    this.fileUrl = environment.uploadUserImage;
    this.userData = {
      ParticipantId: 0,
      ParticipantName: '',
      ParticipantImg: this.userImage,
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
      .subscribe((participant: ParticipantModel) => {
        this.loading = false;
        if (participant == null) {
          this.duplicateError = true;
        }
        else {
          console.log(participant);
          // this.storageService.setUserLocalVariables(participant);
          this.router.navigateByUrl('waiting'); 
        }
      },
        (err) => {
          console.log(err);
          this.error = true;
          this.loading = false;
        });
  }

  private setUserObject() {
    this.userData.ParticipantId = '';
    this.userData.ParticipantImg = this.userImage;
    this.userData.ParticipantName = this.sessionForm.get('ParticipantName').value;
    this.userData.Points = 0;
    this.userData.Time = 0;
    this.userData.GameId = localStorage.getItem('gameId');
  }

  /* FILE UPLOAD */
  public uploadFile = (files, event) => {
    this.loadingfile = true;
    if (files.length === 0 || this.loading) {
      this.fileLoaded = false;
      return;
    }
    /* Preview */
    if (event.target.files && event.target.files[0]) {
      this.fileUrl = URL.createObjectURL(event.target.files[0]);
    }
    /* Upload */
    const fileToUpload = <File>files[0];
    this.formData.append('file', fileToUpload, fileToUpload.name);
    this.fileLoaded = true;
    this.saveFile();
  }

  public saveFile() {
    if (!this.fileLoaded) {
      return;
    }
    /* Store file */
    this.http.post(`${this.baseurl}`, this.formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          let progress = Math.round(100 * event.loaded / event.total);
          if (progress === 100) {
            this.formData = new FormData();
            this.fileLoaded = false;
            this.loadingfile = false;
          }
        } else if (event.type === HttpEventType.Response) {
          let body = event.body as any;
          this.userImage = body.newFile;
          console.log(this.userImage);
          this.loadingfile = false;
        }
      },
        (err) => {
          console.log(err);
          this.error = true;
          this.loading = false;
          this.fileLoaded = false;
        });
  }

  public navigateTo(page) {
    this.router.navigateByUrl(page);
  }
}

import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { SignalRService } from '@services/signal-r.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
    public signalRService: SignalRService,
    private router: Router,
    private zone: NgZone
  ) {
    this.signalRService.startConnection();
    this.signalRService.addRegisterListener();
    this.signalRService.addStartGameListener();

    this.signalRService.participants$.subscribe(participants => {
      if (participants && participants.length > 0) {
        this.zone.run(() => this.router.navigateByUrl('screen/waiting'));
      }
    });
  }

  ngOnInit() {
  }

}

import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs/internal/observable/timer';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  public value = 3;

  constructor(
    private router: Router,
    private zone: NgZone

  ) {
    const source = timer(1000, 1000);
    const subscribe = source.subscribe(val => {
      this.value--;
      if (this.value === -1) {
        subscribe.unsubscribe();
        this.zone.run(() => {
          this.router.navigateByUrl('question');
        });
      }
    });
  }

  ngOnInit() { }
}

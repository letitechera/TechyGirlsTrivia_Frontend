import { Component, OnInit } from '@angular/core';
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
    private router: Router
  ) {
    const source = timer(1000, 1000);
    const subscribe = source.subscribe(val =>{
      this.value--;
      if(this.value===-1){
        subscribe.unsubscribe();
        debugger;
        this.router.navigate(['question/', 1]);
      }
    });
  }

  ngOnInit() { }
}

import { Component, OnInit, NgZone } from '@angular/core';
import { SignalRService } from '@services/signal-r.service';
import { StorageService } from '@services/storage.service';

@Component({
  selector: 'app-final-results',
  templateUrl: './final-results.component.html',
  styleUrls: ['./final-results.component.scss']
})
export class FinalResultsComponent implements OnInit {

  public participants: any[];
  public place: number;
  private current: any;

  constructor(
    public signalRService: SignalRService,
    public storageService: StorageService,
  ) { }

  ngOnInit() {
    this.signalRService.participants$.subscribe(participants => {
      if (participants && participants.length > 0) {
        this.participants = participants;
        this.participants.forEach(element => {
          if (element.participantId === this.storageService.getUserId()) {
            this.current = element;
          }
        });
        const sorted = this.participants.sort((a, b) => a.title.rendered.localeCompare(b.score));
        this.place = sorted.indexOf(this.current);
        console.log(sorted);
        console.log(this.place);
      }
    });
  }

}

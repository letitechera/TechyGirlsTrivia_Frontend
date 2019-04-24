import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-waiting-modal',
  templateUrl: './waiting-modal.component.html',
  styleUrls: ['./waiting-modal.component.scss']
})
export class WaitingModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<WaitingModalComponent>) { }

  ngOnInit() {
  }

  public close(): void {
    this.dialogRef.close();
  }

}

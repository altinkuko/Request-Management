import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  error: string;

  constructor(private popUp: MatDialogRef<ErrorsComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    this.error = data;
  }

  ngOnInit(): void {
  }

  CloseDialog(){
    this.popUp.close(false)
  }

}

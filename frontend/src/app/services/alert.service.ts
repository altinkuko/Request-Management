import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ErrorsComponent} from "../errors/errors.component";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private popup:MatDialog) { }

  showError(message:string){
    this.popup.open(ErrorsComponent,{
      data:message
    })
  }
}

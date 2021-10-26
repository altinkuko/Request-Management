import {Component, Inject, OnInit} from '@angular/core';
import {_Resource} from "../models/resource";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-show-resource',
  templateUrl: './show-resource.component.html',
  styleUrls: ['./show-resource.component.css']
})
export class ShowResourceComponent implements OnInit {

  resources:_Resource[]
  displayedColumns = ['resourceId', 'note', 'seniority', 'skills'];

  constructor(private popUp:MatDialogRef<ShowResourceComponent>,
              @Inject(MAT_DIALOG_DATA) data:any) {
    this.resources = data.resources;
  }

  ngOnInit(): void {
  }
  CloseDialog(){
    this.popUp.close(false)
  }

}

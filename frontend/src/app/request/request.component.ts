import {Component, OnInit} from '@angular/core';
import {_Request} from "../models/request";
import {RequestService} from "../services/request.service";
import {_Resource} from "../models/resource";
import {_Skill} from "../models/skill";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ShowResourceComponent} from "../show-resource/show-resource.component";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  requests: _Request[]
  resources:_Resource[]
  displayedColumns: string[] = ['id', 'areaOfInterest', 'startDate', 'endDate',
    'status', 'createdBy', 'createdOn', 'modifiedBy', 'modifiedOn', 'resources', 'edit'];
  skills:_Skill[]
  matDialogRef: MatDialogRef<ShowResourceComponent> | undefined;


  constructor(private service:RequestService,
              private matDialog: MatDialog) {
    this.requests=[];
    this.resources=[];
    this.skills=[]
  }

  ngOnInit(): void {
    this.service.getRequestsForUser().subscribe(
      data=>{
        this.requests=data;
        console.log(this.requests);
      }
    )
  }

  OpenModal(request:_Request) {
    this.matDialogRef = this.matDialog.open(ShowResourceComponent, {
      width: "100vw",
      height: "auto",
      maxWidth: "650px",
      maxHeight: "900px",
      data: { resources: request.resourceDTOS},
      disableClose: false
    });
  }

}

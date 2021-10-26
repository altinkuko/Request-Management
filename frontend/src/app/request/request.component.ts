import {Component, OnInit} from '@angular/core';
import {_Request} from "../models/request";
import {RequestService} from "../services/request.service";
import {_Resource} from "../models/resource";
import {_Skill} from "../models/skill";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ShowResourceComponent} from "../show-resource/show-resource.component";
import {DeleteRequestComponent} from "../actions/delete-request/delete-request.component";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {RequestFilter} from "../models/request-filter";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Status} from "../models/status";
import {AreaOfInterest} from "../models/area-of-interest";
import {Seniority} from "../models/seniority";
import {SkillsService} from "../services/skills.service";
import {error} from "@angular/compiler/src/util";
import {AlertService} from "../services/alert.service";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  requests: _Request[]
  resources: _Resource[]
  displayedColumns: string[] = ['id', 'areaOfInterest', 'startDate', 'endDate',
    'status', 'description', 'createdBy', 'createdOn', 'modifiedBy', 'modifiedOn', 'resources', 'edit'];
  skills: _Skill[]
  matDialogRef: MatDialogRef<ShowResourceComponent>;
  matDialogDelete: Subscription;
  requestFilter: RequestFilter;
  requestFilterForm: FormGroup;
  statuses = Object.values(Status);
  areaOfInterests = Object.values(AreaOfInterest);
  seniority = Object.values(Seniority);


  constructor(private service: RequestService,
              private matDialog: MatDialog,
              private skillService: SkillsService,
              private router: Router,
              private alertService: AlertService) {
    this.requests = [];
    this.resources = [];
    this.skills = []
    this.requestFilterForm = new FormGroup({
      startDate: new FormControl(null, [Validators.nullValidator]),
      endDate: new FormControl(null, [Validators.nullValidator]),
      notes: new FormControl(null, [Validators.nullValidator]),
      status: new FormControl(null, [Validators.nullValidator]),
      areaOfInterest: new FormControl(null, [Validators.nullValidator]),
      seniority: new FormControl(null, [Validators.nullValidator]),
      skill: new FormControl(null, [Validators.nullValidator]),
      username: new FormControl(null, [Validators.nullValidator]),
    });
    this.requestFilter = this.requestFilterForm.value;
  }

  ngOnInit(): void {
    this.getRequests();
    this.getAllSkills()
  }

  OpenResources(request: _Request) {
    this.matDialogRef = this.matDialog.open(ShowResourceComponent, {
      width: "100vw",
      height: "auto",
      maxWidth: "650px",
      maxHeight: "900px",
      data: {resources: request.resourceDTOS},
      disableClose: false
    });
  }

  openDelete(request: _Request) {
    this.matDialogDelete = this.matDialog.open(DeleteRequestComponent, {
      data: {request: request},
      disableClose: true
    }).afterClosed().subscribe(() => {
      this.getRequests()
    })
  }

  openEdit(request: _Request) {
    sessionStorage.setItem('request', JSON.stringify(request));
    this.router.navigate(['edit-request'])
  }

  getRequests() {
    this.service.getRequestsForUser().subscribe(
      data => {
        this.requests = data;
      },
      error=>{
        this.alertService.showError(error)
      }
    )
  }

  getAllSkills() {
    this.skillService.getAllSkills().subscribe(data => {
      this.skills = data;
    })
  }

  filterRequests() {
    this.requestFilter = this.requestFilterForm.value;
    this.service.filterRequest(this.requestFilter).subscribe(data => {
        this.requests = data;
        //this.requestFilterForm.reset()
        },
      error => {
        this.alertService.showError(error)
      })
  }

  clearFilter() {
    this.requestFilterForm.reset();
    this.getRequests();
  }

  isAdmin(){
    return sessionStorage.getItem('role')==='ROLE_ADMIN'
  }
}

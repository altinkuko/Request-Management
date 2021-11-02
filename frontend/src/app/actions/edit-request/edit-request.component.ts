import {Component, OnInit} from '@angular/core';
import {_Request} from "../../models/request";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Status} from "../../models/status";
import {AreaOfInterest} from "../../models/area-of-interest";
import {Seniority} from "../../models/seniority";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AddResourceComponent} from "../add-resource/add-resource.component";
import {RequestService} from "../../services/request.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AlertService} from "../../services/alert.service";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-edit-request',
  templateUrl: './edit-request.component.html',
  styleUrls: ['./edit-request.component.css']
})
export class EditRequestComponent implements OnInit {

  editForm: FormGroup
  matDialogRef: MatDialogRef<AddResourceComponent>;
  request: _Request;
  statuses = Object.values(Status);
  areaOfInterests = Object.values(AreaOfInterest)
  seniority = Object.values(Seniority)
  id: number
  resourceDialog: Subscription;


  constructor(private formBuilder: FormBuilder,
              private matDialog: MatDialog,
              private requestService: RequestService,
              private router: Router,
              private alert: AlertService,
              private loginService:LoginService) {
    this.request = JSON.parse(<string>sessionStorage.getItem('request'));
    this.id = this.request.id
    this.editForm = formBuilder.group({
      description: this.request.description,
      startDate: this.request.startDate,
      endDate: this.request.endDate,
      notes: this.request.notes,
      status: this.request.status,
      areaOfInterest: this.request.areaOfInterest,
      resourceDTOS: this.formBuilder.array(this.request.resourceDTOS)
    })
  }

  ngOnInit(): void {
    let request = JSON.parse(<string>sessionStorage.getItem('request'));
    sessionStorage.removeItem('request');
    this.editForm = this.formBuilder.group({
      description: request.description,
      startDate: request.startDate,
      endDate: request.endDate,
      notes: request.notes,
      status: request.status,
      areaOfInterest: request.areaOfInterest,
      resourceDTOS: this.formBuilder.array(this.request.resourceDTOS)
    });
  }

  onSubmit() {
    this.request = this.editForm.value
    this.request.id = this.id
    this.updateRequest()
  }

  removeResource(i: number) {
    if (this.request.resourceDTOS.length > 1) {
      this.request.resourceDTOS.splice(i, 1);
      (this.editForm.get('resourceDTOS') as FormArray).removeAt(i)
    }
  }

  openResourceDiag() {
    this.resourceDialog = this.matDialog.open(AddResourceComponent, {
      disableClose: true
    }).afterClosed().subscribe(() => {
      if (sessionStorage.getItem('newResource')!==null){
        let resource = JSON.parse(<string>sessionStorage.getItem('newResource'));
        this.request.resourceDTOS.push(resource);
        (this.editForm.get('resourceDTOS') as FormArray).push(new FormControl(resource));
        sessionStorage.removeItem('newResource');
      }
    })
  }

  updateRequest() {
    console.log(this.editForm)
    if ((this.editForm.controls['status'].value==='PENDING'|| this.editForm.controls['status'].value==='CANCELLED') &&
      (this.editForm.controls['notes'].value===null || this.editForm.controls['notes'].value==='')){
      this.editForm.controls['notes'].setValidators(Validators.required)
      this.alert.showError('Please insert a comment')
    } else {
      let request = this.editForm.value;
      this.requestService.updateRequest(request).subscribe(
        data => {
          this.router.navigate(['requests'])
          this.alert.showError(data.message)
        },
        error => {
          console.log(error)
        }
      )
    }
  }

  isAdmin(){
    return this.loginService.isAdmin()
  }

  public checkError = (controlName: string, errorName: string, form: FormGroup) => {
    return form.controls[controlName].hasError(errorName);
  }
}

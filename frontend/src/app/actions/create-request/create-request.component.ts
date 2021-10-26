import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {_Request} from "../../models/request";
import {RequestService} from "../../services/request.service";
import {Status} from "../../models/status";
import {AreaOfInterest} from "../../models/area-of-interest";
import {Router} from "@angular/router";
import {_Resource} from "../../models/resource";
import {Seniority} from "../../models/seniority";
import {SkillsService} from "../../services/skills.service";
import {_Skill} from "../../models/skill";
import {MatDialog} from "@angular/material/dialog";
import {ErrorsComponent} from "../../errors/errors.component";

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {

  addRequestForm: FormGroup;
  resourceForm: FormGroup;
  request: _Request;
  resources: _Resource[]=[];
  skills:_Skill[]=[];
  statuses = Object.values(Status);
  areaOfInterests = Object.values(AreaOfInterest)
  seniority = Object.values(Seniority)
  skillForm:FormGroup
  skillsForm: FormGroup[]=[]


  constructor(private requestService: RequestService,
              private router: Router,
              private formBuilder: FormBuilder,
              private skillService:SkillsService,
              private matDialog:MatDialog) {
    this.addRequestForm = new FormGroup({
      description: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      notes: new FormControl(),
      status: new FormControl(),
      areaOfInterest: new FormControl('', [Validators.required]),

    });
    this.skillForm = new FormGroup({
      skill: new FormControl(null, [Validators.required])
    });
    this.resourceForm = this.formBuilder.group({
      note: [],
      seniority: [null, Validators.required],
      skillDTOS:new FormArray([])
    });
    this.request = this.addRequestForm.value;
  }

  get skillsDTO(){return this.resourceForm.controls.skillDTOS as FormArray}

  ngOnInit(): void {
    this.skillsForm.push(this.createSkillForm())
    this.getAllSkills();
  }

  onSubmit() {
    this.request = this.addRequestForm.value
    this.request.resourceDTOS = this.resources
    this.requestService.createRequest(this.request).subscribe(res => {
      this.matDialog.open(ErrorsComponent,{
        data:res.message
      })
      this.router.navigate(['requests'])
    })
  }

  public checkError = (controlName: string, errorName: string, form: FormGroup) => {
    return form.controls[controlName].hasError(errorName);
  }

  checkSkill(){
    return (this.resourceForm.get('skillDTOS') as FormArray).length>0;
  }

  checkResources(){
    return this.resources.length>0;
  }

  addResource() {
    this.resources.push(this.resourceForm.value)
    console.log(this.resources)
  }

  removeResource(i:number) {
    if (this.resources.length>1)
    this.resources.splice(i, 1)
  }

  private createSkillForm() {
    return this.formBuilder.group({
      skill: [null, [Validators.required]]
    });
  }

  getAllSkills(){
    this.skillService.getAllSkills().subscribe(data=>{
      this.skills=data;
    })
  }

  addSKill(){
    this.skillsForm.push(this.createSkillForm());
  }

  onChangeSkill(i:number){
    (this.resourceForm.get('skillDTOS') as FormArray).setControl(i, this.skillsForm[i])
  }

  removeSkill(i:number){
    if (this.skillsForm.length>1)
    this.skillsForm.splice(i,1);
    (this.resourceForm.get('skillDTOS') as FormArray).removeAt(i)
  }

}

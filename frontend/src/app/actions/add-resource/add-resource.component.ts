import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {_Skill} from "../../models/skill";
import {SkillsService} from "../../services/skills.service";
import {Seniority} from "../../models/seniority";
import {MatDialogRef} from "@angular/material/dialog";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
export class AddResourceComponent implements OnInit {

  resourceForm:FormGroup
  skills:_Skill[]=[]
  seniority = Object.values(Seniority)
  skillForm:FormGroup
  skillsForm: FormGroup[]=[]

  constructor(private formBuilder:FormBuilder,
              private skillService:SkillsService,
              private popUp:MatDialogRef<AddResourceComponent>) {
    this.resourceForm = this.formBuilder.group({
      note: [],
      seniority: [null, Validators.required],
      skillDTOS:new FormArray([])
    });
    this.skillForm = new FormGroup({
      skill: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getAllSkills()
    this.skillsForm.push(this.skillForm)
  }

  onSubmit() {
    sessionStorage.setItem('newResource', JSON.stringify(this.resourceForm.value))
    this.CloseDialog()
  }

  public checkError = (controlName: string, errorName: string, form: FormGroup) => {
    return form.controls[controlName].hasError(errorName);
  }

  addSKill(){
    this.skillsForm.push(this.createSkillForm());
  }

  getAllSkills(){
    this.skillService.getAllSkills().subscribe(data=>{
      this.skills=data;
    })
  }

  private createSkillForm() {
    return this.formBuilder.group({
      skill: [null, [Validators.required]]
    });
  }

  onChangeSkill(i:number){
    (this.resourceForm.get('skillDTOS') as FormArray).setControl(i, this.skillsForm[i]);
    console.log(this.resourceForm.get('skillDTOS'))
  }

  removeSkill(i:number){
    if (this.skillsForm.length>1)
      this.skillsForm.splice(i,1);
    (this.resourceForm.get('skillDTOS') as FormArray).removeAt(i)
  }

  CloseDialog() {
    this.popUp.close(false)
  }
}

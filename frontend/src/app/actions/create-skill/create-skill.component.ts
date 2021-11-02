import {Component, OnInit} from '@angular/core';
import {SkillsService} from "../../services/skills.service";
import {AlertService} from "../../services/alert.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-skill',
  templateUrl: './create-skill.component.html',
  styleUrls: ['./create-skill.component.css']
})
export class CreateSkillComponent implements OnInit {
  skillForm: FormGroup;

  constructor(private skillService: SkillsService,
              private alert: AlertService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.skillForm = formBuilder.group({
      skill: formBuilder.control(null, [Validators.required])
    })
  }

  ngOnInit(): void {
  }


  onSubmit() {
    let skill = this.skillForm.value;
    this.skillService.createSkill(skill).subscribe(data => {
        this.router.navigate(['requests']);
        // @ts-ignore
        this.alert.showError(data.message)
      }
    )
  }

  checkError(controlName: string, errorName: string, form: FormGroup) {
    return form.controls[controlName].hasError(errorName);
  }
}

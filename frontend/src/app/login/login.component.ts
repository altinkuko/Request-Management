import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';

  @Input() error: string | undefined;


  constructor(private loginService:LoginService,
              private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
  }

  doLogin(){
    this.loginService.login(this.username, this.password).subscribe(
      data=>{
        this.router.navigate(['']);
      },
      error=>{
        this.error="Invalid username or password"
      }
    )
  }

}

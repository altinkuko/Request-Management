import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    console.log(sessionStorage)
    console.log(this.loginService.isUserLoggedIn())
  }

  isUserLoggedIn(){
    return this.loginService.isUserLoggedIn();
  }
}

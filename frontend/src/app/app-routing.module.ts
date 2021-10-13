import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {HomeComponent} from "./home/home.component";
import {LogoutComponent} from "./logout/logout.component";
import {RequestComponent} from "./request/request.component";
import {AuthGuardService} from "./services/auth-guard.service";

const routes: Routes = [
  {path: '', component:HomeComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, data: {title: 'Login'}},
  {path:'logout', component:LogoutComponent},
  {path:'requests', component:RequestComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  declarations:[],
  imports     : [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

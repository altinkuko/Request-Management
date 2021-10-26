import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from "./login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {HomeComponent} from './home/home.component';
import {LogoutComponent} from './logout/logout.component';
import {RequestComponent} from './request/request.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpInterceptorService} from "./services/http-interceptor.service";
import {HeaderComponent} from './header/header.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {ShowResourceComponent} from './show-resource/show-resource.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {CreateRequestComponent} from './actions/create-request/create-request.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {BsDatepickerModule, DatepickerModule} from "ngx-bootstrap/datepicker";
import {MatSelectModule} from "@angular/material/select";
import { DeleteRequestComponent } from './actions/delete-request/delete-request.component';
import { EditRequestComponent } from './actions/edit-request/edit-request.component';
import { AddResourceComponent } from './actions/add-resource/add-resource.component';
import { ErrorsComponent } from './errors/errors.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LogoutComponent,
    RequestComponent,
    HeaderComponent,
    ShowResourceComponent,
    CreateRequestComponent,
    DeleteRequestComponent,
    EditRequestComponent,
    AddResourceComponent,
    ErrorsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatCardModule,
        FormsModule,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        MatDialogModule,
        MatTooltipModule,
        MatButtonModule,
        MatDatepickerModule,
        MatInputModule,
        DatepickerModule,
        BsDatepickerModule,
        MatSelectModule,
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

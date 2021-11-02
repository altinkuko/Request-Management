import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {LoginService} from "./login.service";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ErrorsComponent} from "../errors/errors.component";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private loginService: LoginService, private router:Router, private popup:MatDialog) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (sessionStorage.getItem("username") != null && sessionStorage.getItem("basicAuth") != null) {
      req = req.clone({
        headers: new HttpHeaders({
          'Authorization': sessionStorage.getItem("basicAuth")
        })
      })
    }
    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 403) {
          this.popup.open(ErrorsComponent, {
            data: 'Unauthorized'
          }).afterClosed().subscribe(() => {
            this.router.navigate([''])
          })
        }
        return throwError(err)
      })
    )
  }
}

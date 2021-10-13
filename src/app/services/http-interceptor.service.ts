import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor(private loginService:LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler){
    if (sessionStorage.getItem("username")!=null&&sessionStorage.getItem("basicAuth")!=null){
      req=req.clone({
        headers:new HttpHeaders({
          // @ts-ignore
          'Authorization': sessionStorage.getItem("basicAuth")
        })
      })
    }
    return next.handle(req)
  }
}

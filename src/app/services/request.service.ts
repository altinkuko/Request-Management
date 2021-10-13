import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private baseUrl:string="http://localhost:8080/api"

  constructor(private http: HttpClient) {

  }

  getRequestsForUser():Observable<any>{
    return this.http.get<any>(this.baseUrl+"/requests");
  }
}

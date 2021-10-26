import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {_Request} from "../models/request";
import {RequestFilter} from "../models/request-filter";

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
  createRequest(request:_Request){
    return this.http.post<any>(this.baseUrl+'/request', request);
  }

  deleteRequest(request:_Request){
    return this.http.post(this.baseUrl+'/delete-request', request)
  }

  updateRequest(request:_Request){
    return this.http.post<any>(this.baseUrl+'/update-request', request)
  }

  filterRequest(requestFilter: RequestFilter):Observable<any>{
    return this.http.post(this.baseUrl+'/request/filter', requestFilter)
  }
}

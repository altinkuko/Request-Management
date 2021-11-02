import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {_Skill} from "../models/skill";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(private http: HttpClient) {
  }

  private baseUrl: string = "http://localhost:8080/api"

  public getAllSkills(): Observable<any> {
    return this.http.get(this.baseUrl + '/skills')
  }

  public createSkill(skill: _Skill) {
    return this.http.post(this.baseUrl + '/skill', skill)
  }

}

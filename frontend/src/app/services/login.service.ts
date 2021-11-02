import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    return this.http.post<any>("http://localhost:8080/login", {username,password}).pipe(
      map(auth => {
        sessionStorage.setItem("basicAuth", this.createBasicAuthToken(username,password))
        sessionStorage.setItem("username", username)
        sessionStorage.setItem('role', auth.authorities[0].authority)
      })
    );
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ':' + password)
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    return !(user === null);
  }

  logOut() {
    sessionStorage.clear()
  }
  isAdmin(){
    return sessionStorage.getItem('role')==='ROLE_ADMIN'
  }
}

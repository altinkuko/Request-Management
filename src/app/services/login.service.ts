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
    console.log(username, password)
    return this.http.post<any>("http://localhost:8080/login", {username,password}).pipe(
      map(() => {
        sessionStorage.setItem("basicAuth", this.createBasicAuthToken(username,password))
        sessionStorage.setItem("username", username)
      })
    );
  }

  createBasicAuthToken(username: string | null, password: string | null) {
    return 'Basic ' + window.btoa(username + ':' + password)
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("basicAuth");
  }
}

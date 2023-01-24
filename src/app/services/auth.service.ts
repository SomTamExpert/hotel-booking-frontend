import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "../models/user.model";

const AUTH_API = 'http://localhost:8080/users/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private httpClient: HttpClient) {
  }

  login(user?: User): Observable<any> {
    return this.httpClient.post<User>(AUTH_API + 'login', user)
  }

  register(user?: User): Observable<any> {
    return this.httpClient.post<User>(AUTH_API + 'signup', user);
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}

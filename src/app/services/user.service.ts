import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }
  private baseURL = 'http://localhost:8080/users';
  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseURL);
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(this.baseURL + "/" + id);
  }

  updateUser(id: number | undefined, user: User): Observable<User> {
    return this.httpClient.put<User>(this.baseURL + "/" + id, user);
  }
  getUsersByLastName(lastName: string): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseURL + "/search/" + lastName);
  }

  deleteUser(id: number | undefined): Observable<any> {
    return this.httpClient.delete(this.baseURL + "/" + id);
  }
}

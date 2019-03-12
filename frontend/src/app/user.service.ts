import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:4444';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any>(`${this.uri}/users`).pipe(
      map(this.extractData)
    );
  }

  private extractData(res: Response){
    const body = res;
    return body || {};
  }

  getUserById(id) {
    return this.http.get(`${this.uri}/users/show/${id}`);
  }

  addUser(email, password, firstName, lastName, role) {
    const user = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      role: role
    };
    return this.http.post(`${this.uri}/users/new`, user);
  }

  updateUser(id, email, firstName, lastName, role) {
    console.log("tic");
    const user = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      role: role
    };
    console.log("toc");
    return this.http.put(`${this.uri}/users/edit/${id}`, user);
  }

  dropUser(id) {
    return this.http.delete(`${this.uri}/users/delete/${id}`);
  }
}

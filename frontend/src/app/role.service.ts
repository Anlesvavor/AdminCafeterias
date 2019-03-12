import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  uri = 'http://localhost:4444';

  constructor(private http: HttpClient) { }

  addRole(name, value) {
    const role = {
      name: name,
      value: value
    };
    return this.http.post(`${this.uri}/roles/new`, role);
  }

  getRoles(){
    return this.http.get<any>(`${this.uri}/roles`).pipe(
      map(this.extractData)
    );
  }

  private extractData(res: Response){
    const body = res;
    return body || {};
  }

  getRoleById(id) {
    return this.http.get(`${this.uri}/roles/show/${id}`);
  }

  updateRole(id, name, value) {
    const role = {
      name: name,
      vlaue: value
    };
    return this.http.put(`${this.uri}/roles/edit/${id}`, role);
  }

  dropRole(id) {
    return this.http.delete(`${this.uri}/roles/delete/${id}`);
  }
}

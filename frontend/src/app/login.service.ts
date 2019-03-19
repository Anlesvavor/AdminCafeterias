import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  uri = 'http://localhost:4444';

  constructor(private http: HttpClient) { }

  login(data){
    return this.http.post(`${this.uri}/login`, data).pipe(
      map(this.extractData)
    );
  }

  islogged(){
    return localStorage.getItem('token') || false;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  private extractData(res: Response){
    const body = res;
    return body || {};
  }
}

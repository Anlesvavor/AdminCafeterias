import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DinnerService {

  uri = 'http://localhost:4444';

  constructor(private http: HttpClient) { }

  getDinners() {
    return this.http.get<any>(`${this.uri}/diningRooms/`).pipe(
      map(this.extractData)
    );
  }

  private extractData(res: Response){
    const body = res;
    return body || {};
  }

  getDinnerById(id) {
    return this.http.get(`${this.uri}/diningRooms/show/${id}`);
  }

  addDinner(name, user, description) {
    const dinner = {
      name: name,
      user: user,
      description: description
    };
    return this.http.post(`${this.uri}/diningRooms/new`, dinner);
  }

  updateDinner(id, name, user, description) {
    const dinner = {
      name: name,
      user: user,
      description: description
    };
    return this.http.put(`${this.uri}/diningRooms/edit/${id}`, dinner);
  }

  dropDinner(id) {
    return this.http.delete(`${this.uri}/diningRooms/delete/${id}`);
  }

}

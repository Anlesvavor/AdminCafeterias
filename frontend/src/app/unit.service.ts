import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UnitService {

  uri = 'http://localhost:4444';

  constructor(private http: HttpClient) { }

  getUnits() {
    return this.http.get<any>(`${this.uri}/units`).pipe(
      map(this.extractData)
    );
  }

  private extractData(res: Response){
    const body = res;
    return body || {};
  }

  getUnitById(id) {
    return this.http.get(`${this.uri}/units/show/${id}`);
  }

  addUnit(name) {
    const unit = {
      name: name,
    };
    return this.http.post(`${this.uri}/units/new`, unit);
  }

  updateUnit(id, name) {
    const unit = {
      name: name
    };
    return this.http.put(`${this.uri}/units/edit/${id}`, unit);
  }

  dropUnit(id) {
    return this.http.delete(`${this.uri}/units/delete/${id}`);
  }
}

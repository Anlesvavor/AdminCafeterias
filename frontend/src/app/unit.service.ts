import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UnitService {

  uri = 'http://192.168.100.100:4444';

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
    return this.http.get(`${this.uri}/units/show/${name}`);
  }

  addUnit(name) {
    const unit = {
      name: name,
    };
    return this.http.post(`${this.uri}/units/new`, unit);
  }

  updateUnit(name) {
    console.log("tic");
    const unit = {
      name: name
    };
    console.log("toc");
    return this.http.put(`${this.uri}/units/edit/${name}`, unit);
  }

  dropUnit(id) {
    return this.http.delete(`${this.uri}/units/delete/${id}`);
  }
}

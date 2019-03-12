import { Injectable } from '@angular/core';
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RequisitionsService {

  uri = 'http://localhost:4444';

  constructor(private http: HttpClient) { }

  getRequisitions() {
    return this.http.get<any>(`${this.uri}/requisitions`).pipe(
      map(this.extractData)
    );
  }

  private extractData(res: Response){
    const body = res;
    return body || {};
  }


  getRequisitionById(id) {
    return this.http.get(`${this.uri}/requisitions/show/${id}`);
  }

  addRequisition(diner, orders) {
    const requisition = {
      diner: diner,
      orders : orders,
      date : new Date()
    };
    return this.http.post(`${this.uri}/requisitions/new`, requisition);
  }

  updateRequisition(id, diner, orders) {
    const requisition = {
      diner: diner,
      orders : orders,
      data: new Date()
    };
    return this.http.put(`${this.uri}/requisitions/edit/${id}`, requisition);
  }

  dropRequisition(id) {
    return this.http.delete(`${this.uri}/requisitions/delete/${id}`);
  }
}



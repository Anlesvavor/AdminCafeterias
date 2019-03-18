import { Injectable } from '@angular/core';
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Requisition} from "./requsitions.model";

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

  addRequisition(diner, orders, observations) {
    const requisition = {
      diner: diner,
      orders : orders,
      status: "Pending",
      approvedBy : null,
      dateApproved : null,
      observations : observations,
      approvalObservations : "",
      requisitionOrig : {}
    };
    return this.http.post(`${this.uri}/requisitions/new`, requisition);
  }

  updateRequisition(id, req) {
    console.log(req);
    req._requisitonOrig = {};
    const requisition = {
      diner: req._diner,
      orders: req._orders,
      status: req.status,
      approvedBy: null,
      dateApproved: req.status == "Approved" ? Date.now().valueOf() : null,
      observations: req._observations,
      approvalObservations: req._approvalObservations,
      requisitionOrig: req
    };
    console.log(requisition);
    return this.http.put(`${this.uri}/requisitions/edit/${id}`, requisition);
  }

  dropRequisition(id) {
    return this.http.delete(`${this.uri}/requisitions/delete/${id}`);
  }
}



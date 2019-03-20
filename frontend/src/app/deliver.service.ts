import { Injectable } from '@angular/core';
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DeliverService {

  uri = 'http://localhost:4444';

  constructor(private http: HttpClient) { }

  getDelivers() {
    return this.http.get<any>(`${this.uri}/delivers`).pipe(
      map(this.extractData)
    );
  }

  private extractData(res: Response){
    const body = res;
    return body || {};
  }

  getDeliverById(id) {
    return this.http.get(`${this.uri}/delivers/show/${id}`);
  }

  addDeliver(dinerId, dateSent, dateReceived, orderSent, orderReceived, observations, status, truckId) {
    const deliver = {
      dinerId: dinerId,
      dateSent: dateSent,
      dateReceived: dateReceived,
      orderSent: orderSent,
      orderReceived: orderReceived,
      status: status,
      truckId: truckId
    };
    return this.http.post(`${this.uri}/delivers/new`, deliver);
  }

  updateDeliver(id, dinerId, dateSent, dateReceived, orderSent, orderReceived, observations, status, truckId) {
    const deliver = {
      dinerId: dinerId,
      dateSent: dateSent,
      dateReceived: dateReceived,
      orderSent: orderSent,
      orderReceived: orderReceived,
      status: status,
      truckId: truckId
    };
    return this.http.put(`${this.uri}/delivers/edit/${id}`, deliver);
  }

  dropDeliver(id) {
    return this.http.delete(`${this.uri}/delivers/delete/${id}`);
  }
}



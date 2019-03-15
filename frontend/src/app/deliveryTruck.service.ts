import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DeliveryTruckService {

  uri = 'http://localhost:4444';

  constructor(private http: HttpClient) { }

  getDeliveryTrucks() {
    return this.http.get<any>(`${this.uri}/deliveryTrucks`).pipe(
      map(this.extractData)
    );
  }

  private extractData(res: Response){
    const body = res;
    return body || {};
  }

  getDeliveryTruckById(id) {
    return this.http.get(`${this.uri}/deliveryTrucks/show/${id}`);
  }

  addDeliveryTruck(name, driver, plateNumber, driverPhoneNumber, capacity) {
    const deliveryTruck = {
      name: name,
      driver: driver,
      plateNumber: plateNumber,
      driverPhoneNumber: driverPhoneNumber,
      capacity: capacity
    };
    return this.http.post(`${this.uri}/deliveryTrucks/new`, deliveryTruck);
  }

  updateDeliveryTruck(id, name, driver, plateNumber, driverPhoneNumber, capacity) {
    const deliveryTruck = {
      name: name, 
      driver: driver,
      plateNumber: plateNumber,
      driverPhoneNumber: driverPhoneNumber,
      capacity: capacity
    };
    console.log(deliveryTruck);
    return this.http.put(`${this.uri}/deliveryTrucks/edit/${id}`, deliveryTruck);
  }

  dropDeliveryTruck(id) {
    return this.http.delete(`${this.uri}/deliveryTrucks/delete/${id}`);
  }
}

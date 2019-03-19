import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeliverService {

  uri = 'http://localhost:4444';

  constructor(private http: HttpClient) { }

  getDeliveries() {
    return this.http.get<any>(`${this.uri}/deliver`).pipe(
      map(this.extractData)
    );
  }

  private extractData(res: Response){
    const body = res;
    return body || {};
  }

  getDeliveryById(id) {
    return this.http.get(`${this.uri}/deliveryTrucks/show/${id}`);
  }

  addDelivery(name, driver, plateNumber, driverPhoneNumber, capacity) {
    const delivery = {
      name: name,
      driver: driver,
      plateNumber: plateNumber,
      driverPhoneNumber: driverPhoneNumber,
      capacity: capacity
    };
    return this.http.post(`${this.uri}/deliveryTrucks/new`, delivery);
  }

  updateDelivery(id, name, driver, plateNumber, driverPhoneNumber, capacity) {
    const delivery = {
    dinerId : String,
    dateSent: Date,
    dateReceived: Date,
    orderSent: [],
    orderReceived: [],
    observations: String,
    status: String,
    truckId: String
    };
    return this.http.put(`${this.uri}/deliveryTrucks/edit/${id}`, delivery);
  }

}

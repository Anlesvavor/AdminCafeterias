import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  uri = 'http://localhost:4444';

  constructor(private http: HttpClient) { }

  getProviders() {
    return this.http.get<any>(`${this.uri}/providers`).pipe(
      map(this.extractData)
    );
  }

  private extractData(res: Response){
    const body = res;
    return body || {};
  }


  getProviderById(id) {
    return this.http.get(`${this.uri}/providers/show/${id}`);
  }

  addProvider(name, contact, telephoneNumber, email, rfc, postalCode, street, number, extNumber, colony) {
    const provider = {
    name: name,
    contact: contact,
    telephoneNumber: telephoneNumber,
    email: email,
    rfc: rfc,
    postalCode: postalCode,
    street: street,
    number: number,
    extNumber: extNumber,
    colony: colony

  };
    return this.http.post(`${this.uri}/providers/new`, provider);
  }

  updateProvider(id, name, contact, telephoneNumber, email, rfc, postalCode, street, number, extNumber, colony) {
    const provider = {
      name: name,
      contact: contact,
      telephoneNumber: telephoneNumber,
      email: email,
      rfc: rfc,
      postalCode: postalCode,
      street: street,
      number: number,
      extNumber: extNumber,
      colony: colony
    };
    return this.http.put(`${this.uri}/providers/edit/${id}`, provider);
  }

  dropProvider(id) {
    return this.http.delete(`${this.uri}/providers/delete/${id}`);
  }
}



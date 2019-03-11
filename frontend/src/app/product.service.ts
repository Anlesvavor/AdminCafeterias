import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  uri = 'http://localhost:4444';

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<any>(`${this.uri}/products`).pipe(
      map(this.extractData)
    );
  }

  private extractData(res: Response){
    const body = res;
    return body || {};
  }


  getProductById(id) {
    return this.http.get(`${this.uri}/products/show/${id}`);
  }

  addProduct(name, unities, category, description, price) {
    const product = {
    name: name,
    unities :unities,
    category: category,
    description: description,
    price: price
  };
    return this.http.post(`${this.uri}/products/new`, product);
  }

  updateProduct(id, name, unities, category, description, price) {
    const product = {
      name: name,
    unities :unities,
    category: category,
    description: description,
    price: price
    };
    return this.http.put(`${this.uri}/products/edit/${id}`, product);
  }

  dropProduct(id) {
    return this.http.delete(`${this.uri}/products/delete/${id}`);
  }
}



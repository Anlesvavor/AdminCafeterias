import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  uri = 'http://localhost:4444';

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<any>(`${this.uri}/categories`).pipe(
      map(this.extractData)
    );
  }

  private extractData(res: Response){
    const body = res;
    return body || {};
  }

  getCategoryById(id) {
    return this.http.get(`${this.uri}/categories/show/${id}`);
  }

  addCategory(name) {
    const category = {
      name: name
    };
    return this.http.post(`${this.uri}/categories/new`, category);
  }

  updateCategory(id, name) {
    console.log("tic");
    const category = {
      name: name
    };
    console.log("toc");
    return this.http.put(`${this.uri}/categories/edit/${id}`, category);
  }

  dropCategory(id) {
    return this.http.delete(`${this.uri}/categories/delete/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { product } from 'src/app/Model/product/product';

let api = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this.http.get(`${api}/categories`);
  }

  getProductsByCategory(cat_id: number): Observable<product[]> {
    return this.http.get<product[]>(`${api}/products/category=${cat_id}`);
  }
}

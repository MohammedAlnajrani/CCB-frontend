import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { product } from 'src/app/Model/product/product';
import { HttpClient } from '@angular/common/http';

const api = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProductDetails(id: number): Observable<product> {
    return this.http.get<product>(`${api}/product/${id}`);
  }
}

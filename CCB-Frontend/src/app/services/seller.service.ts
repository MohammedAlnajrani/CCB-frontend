import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { seller } from 'src/app/Model/seller/seller';
import { product } from '../Model/product/product';

let api = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class SellerService {
  constructor(private http: HttpClient) {}

  getSellerById(id: number | undefined): Observable<seller> {
    return this.http.get<seller>(`${api}/sellers/${id}`);
  }

  getAllProductsFromSeller(id: number): Observable<product[]> {
    return this.http.get<product[]>(`${api}/products/seller/${id}`);
  }
}

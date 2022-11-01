import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { product } from '../Model/product/product';

let api = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  searchProduct(query: string, city: string): Observable<product[]> {
    return this.http.get<product[]>(`${api}/search/${query}/${city}`);
  }
}

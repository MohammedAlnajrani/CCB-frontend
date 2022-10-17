import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mb } from 'src/app/Model/Compatibility/motherboard';
import { HttpClient } from '@angular/common/http';

const api = 'http://localhost:3000/motherboard';
@Injectable({
  providedIn: 'root',
})
export class MbService {
  constructor(private http: HttpClient) {}

  getAllMbs(): Observable<mb[]> {
    return this.http.get<mb[]>(api);
  }
}

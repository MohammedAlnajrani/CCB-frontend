import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { gpu } from 'src/app/Model/Compatibility/gpu';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let api = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class GpuService {
  constructor(private http: HttpClient) {}

  getAllGpu(): Observable<gpu[]> {
    return this.http.get<gpu[]>(`${api}/gpu`);
  }
}

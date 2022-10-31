import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { memory } from 'src/app/Model/Compatibility/memory';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let api = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class MemoryService {
  constructor(private http: HttpClient) {}
  getAllMemory(): Observable<memory[]> {
    return this.http.get<memory[]>(`${api}/memory`);
  }
}

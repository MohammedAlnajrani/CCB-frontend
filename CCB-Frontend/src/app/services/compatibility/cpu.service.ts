import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cpu } from 'src/app/Model/Compatibility/cpu';
import { HttpClient } from '@angular/common/http';
import { first, mergeMap } from 'rxjs/operators';

const api = 'http://localhost:3000/cpu';
@Injectable({
  providedIn: 'root',
})
export class CpuService {
  constructor(private http: HttpClient) {}

  getAllCpus(): Observable<cpu[]> {
    return this.http.get<cpu[]>(api);
  }
}

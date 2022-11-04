import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

let cdnApi = environment.cdnApi;
@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  uploadImage(values: any): Observable<any> {
    let data = values;
    return this.http.post<any>(`${cdnApi}`, data);
  }
}

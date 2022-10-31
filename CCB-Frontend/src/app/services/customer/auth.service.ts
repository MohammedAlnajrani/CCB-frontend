import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { customer } from 'src/app/Model/customer/customer';
import { seller } from 'src/app/Model/seller/seller';

let api = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  customerRegister(customer: customer): Observable<customer> {
    return this.http.post<customer>(`${api}/customer`, customer);
  }

  customerLogin(customer: customer): Observable<customer> {
    return this.http.post<customer>(`${api}/auth/customer`, customer, {
      withCredentials: true,
    });
  }

  getCustomerById(id: number | undefined): Observable<customer> {
    return this.http.get<customer>(`${api}/customer/${id}`, {
      withCredentials: true,
    });
  }

  sellerRegister(seller: seller): Observable<customer> {
    return this.http.post<customer>(`${api}/sellers`, seller);
  }

  sellerLogin(seller: seller): Observable<seller> {
    return this.http.post<seller>(`${api}/auth/seller`, seller, {
      withCredentials: true,
    });
  }
}

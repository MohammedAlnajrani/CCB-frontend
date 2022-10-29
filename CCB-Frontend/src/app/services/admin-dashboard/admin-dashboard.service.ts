import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { seller } from 'src/app/Model/seller/seller';
import { product } from 'src/app/Model/product/product';
import { customer } from 'src/app/Model/customer/customer';

let api = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {
  constructor(private http: HttpClient) {}

  getTotalCustomers(): Observable<number> {
    return this.http.get<number>(`${api}/totalCustomer`, {
      withCredentials: true,
    });
  }

  getTotalSellers(): Observable<seller[]> {
    return this.http.get<seller[]>(`${api}/sellers`, {
      withCredentials: true,
    });
  }

  getTotalProducts(): Observable<product> {
    return this.http.get<product>(`${api}/product`, {
      withCredentials: true,
    });
  }

  customerEachMonth() {
    return this.http.get(`${api}/customerEachMonth`, { withCredentials: true });
  }
  getAllCustomers(): Observable<customer[]> {
    return this.http.get<customer[]>(`${api}/customers`, {
      withCredentials: true,
    });
  }
  customerLast7Days() {
    return this.http.get(`${api}/customerLast7Days`, { withCredentials: true });
  }
  sellerEachMonth() {
    return this.http.get(`${api}/sellerEachMonth`, { withCredentials: true });
  }
  ordersEachMonth() {
    return this.http.get(`${api}/OrdersEachMonth`, { withCredentials: true });
  }
  allOrders() {
    return this.http.get(`${api}/orders`, { withCredentials: true });
  }
  deleteCustomer(id: number | undefined) {
    return this.http.delete(`${api}/customer/delete/${id}`, {
      withCredentials: true,
    });
  }
  deleteSeller(id: number | undefined) {
    return this.http.delete(`${api}/seller/delete/${id}`, {
      withCredentials: true,
    });
  }
}

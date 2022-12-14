import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { seller } from 'src/app/Model/seller/seller';
import { product } from 'src/app/Model/product/product';
import { customer } from 'src/app/Model/customer/customer';
import { orders } from 'src/app/Model/orders';

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
  deleteProduct(id: number | undefined) {
    return this.http.delete<product>(`${api}/product/${id}`, {
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
  ProductsLast7Days() {
    return this.http.get(`${api}/ProductsLast7Days`, {
      withCredentials: true,
    });
  }
  sellerEachMonth() {
    return this.http.get(`${api}/sellerEachMonth`, { withCredentials: true });
  }
  ordersEachMonth() {
    return this.http.get(`${api}/OrdersEachMonth`, { withCredentials: true });
  }
  productsLastMonth() {
    return this.http.get(`${api}/ProductsLastMonth`, { withCredentials: true });
  }
  allOrders(): Observable<orders[]> {
    return this.http.get<orders[]>(`${api}/orders`, { withCredentials: true });
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
  sellerLast7Days() {
    return this.http.get(`${api}/sellerLast7Days`, {
      withCredentials: true,
    });
  }
  ordersLast7Days() {
    return this.http.get(`${api}/OrdersLast7Days`, {
      withCredentials: true,
    });
  }
}

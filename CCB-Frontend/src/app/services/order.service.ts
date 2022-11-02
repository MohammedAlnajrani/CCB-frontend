import { Injectable } from '@angular/core';
import { orders } from 'src/app/Model/orders';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { orders_details } from '../Model/order_details';
import { product } from '../Model/product/product';

let api = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrderById(id: number): Observable<orders_details[]> {
    return this.http.get<orders_details[]>(`${api}/orders/${id}`, {
      withCredentials: true,
    });
  }
  updateOrder(id: number, order_auth: any) {
    return this.http.put(`${api}/orders/${id}`, order_auth, {
      withCredentials: true,
    });
  }
  getOrderSellerById(id: number): Observable<orders_details[]> {
    return this.http.get<orders_details[]>(`${api}/seller/orders/${id}`, {
      withCredentials: true,
    });
  }
  getAllOrdersBySeller(): Observable<orders[]> {
    return this.http.get<orders[]>(`${api}/orders/seller`, {
      withCredentials: true,
    });
  }
  getOrderID(id: number): Observable<any> {
    return this.http.get<any>(`${api}/order/${id}`, {
      withCredentials: true,
    });
  }
  deleteOrder(id: number | undefined): Observable<any> {
    return this.http.delete<any>(`${api}/orders/${id}`, {
      withCredentials: true,
    });
  }
  getAllOrdersByCustomer(): Observable<orders> {
    return this.http.get<orders>(`${api}/orders/customer`, {
      withCredentials: true,
    });
  }

  sellerOrdersPerMonth() {
    return this.http.get(`${api}/sellerOrdersByMonth`, {
      withCredentials: true,
    });
  }
  checkout(prodcut: product[]) {
    return this.http.post(`${api}/orders/new`, prodcut, {
      withCredentials: true,
    });
  }
}

import { Injectable } from '@angular/core';
import { orders } from 'src/app/Model/orders';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { orders_details } from '../Model/order_details';

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
}

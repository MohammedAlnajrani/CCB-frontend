import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { orders } from '../Model/orders';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css'],
})
export class CustomerOrdersComponent implements OnInit {
  ordersList: orders[] = [];
  errorMsg = '';
  constructor(private orderService: OrderService, private route: Router) {}

  ngOnInit(): void {
    this.getAllOrdersByCustomer();
  }

  getAllOrdersByCustomer() {
    this.orderService.getAllOrdersByCustomer().subscribe(
      (data: any) => {
        this.ordersList = data;
        for (let i = 0; i < this.ordersList.length; i++) {
          this.ordersList[i].order_date = moment(
            this.ordersList[i].order_date
          ).format('MMMM D YYYY');
        }
      },
      (err) => {
        this.errorMsg = err.error;
      }
    );
  }

  orderDetails(order: orders) {
    this.route.navigateByUrl(`/order/${order.order_id}`);
  }
}

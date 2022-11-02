import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { orders } from 'src/app/Model/orders';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: orders[] = [];
  constructor(private orderService: OrderService, private route: Router) {}

  ngOnInit(): void {
    this.getAllOrdersBySeller();
  }

  getAllOrdersBySeller() {
    this.orderService.getAllOrdersBySeller().subscribe((res) => {
      this.orders = res;
      for (let i = 0; i < this.orders.length; i++) {
        this.orders[i].order_date = moment(this.orders[i].order_date).format(
          'MMMM Do YYYY'
        );
      }
    });
  }
  orderDetails(order: orders) {
    this.route.navigateByUrl(`seller/order/${order.order_id}`);
  }
}

import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AdminDashboardService } from 'src/app/services/admin-dashboard/admin-dashboard.service';
import { Chart, registerables } from 'node_modules/chart.js';
import { orders } from 'src/app/Model/orders';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

Chart.register(...registerables);

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  ordersEachMonth: any;
  ordersLast7Days: any = 0;
  ordersPerMonth: any[] = [];
  Months: any[] = [];
  orders: orders[] = [];
  constructor(
    private adminDashboard: AdminDashboardService,
    private route: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.adminDashboard.ordersEachMonth().subscribe((res) => {
      this.ordersEachMonth = res;
      if (this.ordersEachMonth != null) {
        for (let i = 0; i < this.ordersEachMonth.length; i++) {
          this.ordersPerMonth[i] = this.ordersEachMonth[i].count;
          this.Months[i] = moment(this.ordersEachMonth[i].created_at).format(
            'MMMM'
          );
        }
      }
      this.loadChart(
        this.Months,
        this.ordersPerMonth,
        'bar',
        'barchart',
        'rgba(255,165,0, 0.5)',
        'Orders'
      );
    });
    this.getOrdersLast7Days();
    this.getAllOrders();
  }

  loadChart(
    Months: any,
    ordersPerMonth: any,
    type: any,
    id: any,
    color: any,
    label: any
  ) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: Months,
        datasets: [
          {
            label: `#${label}`,
            data: ordersPerMonth,
            backgroundColor: color,
            borderColor: ['rgb(85,0,155)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        ticks: {
          precision: 0,
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  getOrdersLast7Days() {
    this.adminDashboard.ordersLast7Days().subscribe((res: any) => {
      this.ordersLast7Days = res[0].count;
    });
  }
  getAllOrders() {
    this.adminDashboard.allOrders().subscribe((res) => {
      this.orders = res;
      console.log(res);
      for (let i = 0; i < this.orders.length; i++) {
        this.orders[i].order_date = moment(this.orders[i].order_date).format(
          'MMMM Do YYYY'
        );
      }
    });
  }
  orderDetails(order: orders) {
    this.route.navigateByUrl(`order/${order.order_id}`);
  }

  deleteOrder(order: orders | undefined) {
    if (
      confirm(
        `Are you sure you want to delete customer with id ${order?.order_id}`
      )
    ) {
      this.orderService.deleteOrder(order?.order_id).subscribe((res) => {
        window.location.reload();
      });
    } else {
      console.log(order?.order_id + ' cancel');
    }
  }
}

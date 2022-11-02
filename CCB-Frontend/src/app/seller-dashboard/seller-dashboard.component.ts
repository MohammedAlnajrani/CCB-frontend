import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { orders } from '../Model/orders';
import { OrderService } from '../services/order.service';
import { Chart, registerables } from 'node_modules/chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css'],
})
export class SellerDashboardComponent implements OnInit {
  totalOrders = 0;
  ordersEachMonth: any;
  ordersBySellerList: orders[] = [];
  ordersPerMonth: any[] = [];
  Months: any[] = [];
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getAllOrdersBySeller();
    this.orderService.sellerOrdersPerMonth().subscribe((res) => {
      this.ordersEachMonth = res;
      if (this.ordersEachMonth != null) {
        for (let i = 0; i < this.ordersEachMonth.length; i++) {
          this.ordersPerMonth[i] = this.ordersEachMonth[i].count;
          this.Months[i] = moment(this.ordersEachMonth[i].created_at).format(
            'YYYY-MMMM-D'
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
  }
  loadChart(
    Months: any,
    customerPerMonth: any,
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
            data: customerPerMonth,
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

  getAllOrdersBySeller() {
    this.orderService.getAllOrdersBySeller().subscribe((res) => {
      this.ordersBySellerList = res;
      console.log(res);
    });
  }
}

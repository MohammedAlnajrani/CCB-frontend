import { Component, OnInit, ViewChild } from '@angular/core';
import { product } from '../Model/product/product';
import { seller } from '../Model/seller/seller';
import { AdminDashboardService } from '../services/admin-dashboard/admin-dashboard.service';
import { Chart, registerables } from 'node_modules/chart.js';
import * as moment from 'moment';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  totalCustomers = 0;
  seller: seller[] = [];
  products: product[] = [];
  customerEachMonth: any;
  sellerEachMonth: any;
  Months: any[] = [];
  customerPerMonth: any[] = [];
  sellerPerMonth: any[] = [];

  constructor(private adminService: AdminDashboardService) {}

  ngOnInit(): void {
    this.getTotalCustomers();
    this.getAllSellers();
    this.getAllProducts();
    this.adminService.customerEachMonth().subscribe((res) => {
      this.customerEachMonth = res;
      if (this.customerEachMonth != null) {
        for (let i = 0; i < this.customerEachMonth.length; i++) {
          this.customerPerMonth[i] = this.customerEachMonth[i].count;
          this.Months[i] = moment(this.customerEachMonth[i].created_at).format(
            'YYYY-MMMM-D'
          );
        }
      }
      this.loadChart(
        this.Months,
        this.customerPerMonth,
        'bar',
        'barchart',
        'rgba(255,165,0, 0.5)',
        'Customer'
      );
      this.adminService.sellerEachMonth().subscribe((res) => {
        this.sellerEachMonth = res;
        if (this.sellerEachMonth != null) {
          for (let i = 0; i < this.sellerEachMonth.length; i++) {
            this.sellerPerMonth[i] = this.sellerEachMonth[i].count;
          }
          console.log(this.sellerPerMonth);
          this.loadChart(
            this.Months,
            this.sellerPerMonth,
            'bar',
            'barchart1',
            'rgba(85,0,155,0.5)',
            'Seller'
          );
        }
      });
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
  getTotalCustomers() {
    this.adminService.getTotalCustomers().subscribe((res: any) => {
      this.totalCustomers = res.count;
    });
  }

  getAllSellers() {
    this.adminService.getTotalSellers().subscribe((res: any) => {
      this.seller = res;
    });
  }

  getAllProducts() {
    this.adminService.getTotalProducts().subscribe((res: any) => {
      this.products = res;
    });
  }

  getCustomersEachMonth() {
    this.adminService.customerEachMonth().subscribe((res) => {
      this.customerEachMonth = res;
      console.log(this.customerEachMonth);
      for (let i = 0; i < this.customerEachMonth.length; i++) {
        this.customerPerMonth = this.customerEachMonth[i].count;
      }
    });

    // let created_at = res[0].created_at;
    // const date = moment(created_at);
    // console.log(date.format('MMMM'));
  }
}

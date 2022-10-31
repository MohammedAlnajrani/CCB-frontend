import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AdminDashboardService } from 'src/app/services/admin-dashboard/admin-dashboard.service';
import { Chart, registerables } from 'node_modules/chart.js';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { product } from 'src/app/Model/product/product';
import { CategoryService } from 'src/app/services/category/category.service';

Chart.register(...registerables);

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productList: product[] = [];
  productsPerMonth: any;
  productsByMonth: any[] = [];
  Months: any[] = [];
  category: any;
  productsInWeek: any;
  constructor(
    private route: Router,
    private productService: ProductService,
    private adminService: AdminDashboardService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.adminService.productsLastMonth().subscribe((res: any) => {
      this.productsPerMonth = res;

      if (this.productsPerMonth != null) {
        for (let i = 0; i < this.productsPerMonth.length; i++) {
          this.productsByMonth[i] = this.productsPerMonth[i].count;
          this.Months[i] = moment(this.productsPerMonth[i].created_at).format(
            'MMMM'
          );
        }
      }
      this.loadChart(
        this.Months,
        this.productsByMonth,
        'bar',
        'barchart',
        'rgba(255,165,0, 0.5)',
        'Products'
      );
    });
    this.getProductsLast7Days();
    this.getAllProducts();
  }

  loadChart(
    Months: any,
    productsByMonth: any,
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
            data: productsByMonth,
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

  getProductsLast7Days() {
    this.adminService.ProductsLast7Days().subscribe((res: any) => {
      this.productsInWeek = res[0].count;
    });
  }
  getAllProducts() {
    this.productService.getAllProducts().subscribe((res) => {
      this.productList = res;

      for (let i = 0; i < this.productList.length; i++) {
        this.productList[i].created_at = moment(
          this.productList[i].created_at
        ).format('MMMM Do YYYY');
      }
    });
  }
  productDetails(product: product) {
    console.log(this.route.navigateByUrl(`products/${product.product_id}`));
  }

  deleteProduct(product: product) {
    if (
      confirm(
        `Are you sure you want to delete product with id ${product.product_id}?`
      )
    ) {
      this.adminService
        .deleteProduct(product.product_id)
        .subscribe((res) => {});
    } else {
      console.log(`canceled product with id ${product.product_id}`);
    }
  }
}

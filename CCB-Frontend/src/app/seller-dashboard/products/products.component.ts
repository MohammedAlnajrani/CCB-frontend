import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { product } from 'src/app/Model/product/product';
import { AdminDashboardService } from 'src/app/services/admin-dashboard/admin-dashboard.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productList: product[] = [];

  constructor(
    private productService: ProductService,
    private route: Router,
    private adminService: AdminDashboardService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
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
        .subscribe((res) => {
          window.location.reload()
        });
    } else {
      console.log(`canceled product with id ${product.product_id}`);
    }
  }
}

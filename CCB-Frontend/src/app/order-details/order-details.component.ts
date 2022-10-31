import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { orders } from '../Model/orders';
import { orders_details } from '../Model/order_details';
import { product } from '../Model/product/product';
import { seller } from '../Model/seller/seller';
import { AuthCustomerService } from '../services/auth-customer.service';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product/product.service';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  constructor(
    private order: OrderService,
    private router: ActivatedRoute,
    private productService: ProductService,
    private sellerService: SellerService,
    private authService: AuthCustomerService,
    private route: Router
  ) {}
  total = 0;
  id = 0;
  public orderDetails: orders_details[] = [];
  public products: product[] = [];
  date: any;
  orderID: any;
  order_auth: any;
  seller: seller = {
    seller_email: '',
    seller_password: '',
    shop_name: '',
    role_id: 2,
  };
  errorMsg = '';
  auth = false;
  ngOnInit(): void {
    this.router.paramMap.subscribe((param) => {
      this.id = param.get('id') as unknown as number;
      this.getOrderDetails(this.id);
      //check if auth to view order or not
      this.order.getOrderID(this.id).subscribe((res) => {
        console.log(res);
        const decode = this.authService.getDecodedAccessToken(
          this.authService.getToken()
        );
        if (!(decode.role_id == 3 || decode.customer_id == res.customer_id)) {
          this.auth = false;
          this.route.navigateByUrl('/');
        }
      });
      this.auth = true;
    });
  }

  getOrderDetails(id: number) {
    this.order.getOrderById(id).subscribe(
      (data) => {
        this.orderDetails = data;

        this.getSellerDetails(this.orderDetails[0].seller_id);

        this.orderID = this.orderDetails[0].order_id;
        this.order_auth = this.orderDetails[0].order_auth;
        this.date = moment(this.orderDetails[0].order_date).format(
          'MMMM D YYYY'
        );
        for (let order of this.orderDetails) {
          this.getProductDetails(order.product_id);
        }
        setTimeout(() => {
          this.calculateTotal();
        }, 500);
      },
      (err) => {
        this.errorMsg = err.error;
        console.log(err);
      }
    );
  }

  getProductDetails(id: number) {
    this.productService.getProductDetails(id).subscribe((res) => {
      this.products.push(res);
    });
  }

  calculateTotal() {
    console.log(this.products[0]);
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].product_id == this.orderDetails[i].product_id) {
        const tempTotal =
          this.products[i].price * this.orderDetails[i].quantity;
        this.total += tempTotal;
      }
    }
    console.log(this.total);
  }

  getSellerDetails(id: number | undefined) {
    this.sellerService.getSellerById(id).subscribe((res) => {
      this.seller = res;
      console.log(this.seller.shop_name);
    });
  }
}

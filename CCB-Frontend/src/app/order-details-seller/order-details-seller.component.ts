import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { customer } from '../Model/customer/customer';
import { orders_details } from '../Model/order_details';
import { product } from '../Model/product/product';
import { seller } from '../Model/seller/seller';
import { AuthCustomerService } from '../services/auth-customer.service';
import { AuthService } from '../services/customer/auth.service';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product/product.service';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-order-details-seller',
  templateUrl: './order-details-seller.component.html',
  styleUrls: ['./order-details-seller.component.css'],
})
export class OrderDetailsSellerComponent implements OnInit {
  total = 0;
  id = 0;
  public orderDetails: any[] = [];
  public products: product[] = [];
  date: any;
  orderID: any;
  order_auth: any = '';
  form!: FormGroup;
  seller: seller = {
    seller_email: '',
    seller_password: '',
    shop_name: '',
    role_id: 2,
  };
  customer: customer = {
    customer_email: '',
    cus_first_name: '',
    cus_last_name: '',
    customer_password: '',
    role_id: 1,
  };
  errorMsg = '';
  auth = false;
  status = '';
  constructor(
    private order: OrderService,
    private router: ActivatedRoute,
    private productService: ProductService,
    private sellerService: SellerService,
    private authService: AuthCustomerService,
    private route: Router,
    private customerService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((param) => {
      this.id = param.get('id') as unknown as number;
      this.form = this.formBuilder.group({
        id: this.id,
        order_auth: '',
      });
      this.getOrderDetails(this.id);
      //check if auth to view order or not
      this.order.getOrderID(this.id).subscribe((res) => {
        const decode = this.authService.getDecodedAccessToken(
          this.authService.getToken()
        );
        if (res == null) {
          this.route.navigateByUrl('/');
          return;
        }
        if (!decode) {
          this.route.navigateByUrl('/');
          return;
        }
        if (decode.role_id == 3 || decode.seller_id == res.seller_id) {
          this.auth = true;
        } else {
          this.route.navigateByUrl('/');
          return;
        }
        this.status = res.order_status;
      });
    });
  }

  getSellerDetails(id: number | undefined) {
    this.sellerService.getSellerById(id).subscribe((res) => {
      this.seller = res;
      console.log(this.seller.shop_name);
    });
  }
  getCustomerById() {
    this.customerService
      .getCustomerById(this.orderDetails[0].customer_id)
      .subscribe((res) => {
        this.customer = res;
      });
  }
  getOrderDetails(id: number) {
    this.order.getOrderSellerById(id).subscribe(
      async (data) => {
        this.orderDetails = data;

        this.getCustomerById();
        this.getSellerDetails(this.orderDetails[0].seller_id);

        this.orderID = this.orderDetails[0].order_id;
        this.order_auth = this.orderDetails[0].order_auth;
        this.date = moment(this.orderDetails[0].order_date).format(
          'MMMM D YYYY'
        );
        for (let order of this.orderDetails) {
          await this.getProductDetails(order.product_id);
        }
        setTimeout(() => {
          this.calculateTotal();
        }, 1750);
      },
      (err) => {
        this.errorMsg = err.error;
        console.log(err);
      }
    );
  }
  async getProductDetails(id: number) {
    await this.productService.getProductDetails(id).subscribe((res) => {
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

  updateOrder() {
    const order_auth = { order_auth: this.form.get('order_auth')?.value };
    console.log(order_auth);
    this.order.updateOrder(this.id, order_auth).subscribe(
      (data: any) => {
        this.errorMsg = '';
        //wait 2 seconds and navigate

        window.location.reload();
      },
      (err) => {
        console.log(err);
        this.errorMsg = err.error;
      }
    );
  }
}

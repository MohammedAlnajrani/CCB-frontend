import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { product } from '../Model/product/product';
import { AuthCustomerService } from '../services/auth-customer.service';
import { AuthService } from '../services/customer/auth.service';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-add-prodcut',
  templateUrl: './add-prodcut.component.html',
  styleUrls: ['./add-prodcut.component.css'],
})
export class AddProdcutComponent implements OnInit {
  form!: FormGroup;
  product: product = {
    product_name: '',
    product_quantity: 0,
    product_description: '',
    tags: '',
    price: 0,
    lat: 0,
    lan: 0,
    city: '',
    neighborhood: '',
    seller_id: 0,
    category_id: 0,
  };
  token = this.authCustomer.getDecodedAccessToken(this.authCustomer.getToken());
  sellerID = this.token.seller_id;
  errorMsg = '';
  added: boolean = false;
  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authCustomer: AuthCustomerService
  ) {
    this.form = this.formBuilder.group({
      product_name: '',
      product_quantity: '',
      product_description: '',
      tags: 2,
      price: '',
      lat: 0,
      lan: 0,
      city: '',
      neighborhood: '',
      seller_id: this.sellerID,
      category_id: '',
    });
  }

  ngOnInit(): void {}

  addProduct() {
    this.productService.addProduct(this.form.getRawValue()).subscribe(
      (data: any) => {
        this.errorMsg = '';
        this.added = true;

        setTimeout(() => {
          this.router.navigateByUrl(`/products/${data.product_id}`);
        }, 1000);
      },
      (err) => {
        this.errorMsg = err.error;
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../Model/product/product';
import { AuthCustomerService } from '../services/auth-customer.service';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  added = false;
  errorMsg = '';
  id = 0;
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
  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private productService: ProductService,
    private authService: AuthCustomerService
  ) {
    this.form = this.formBuilder.group({
      product_id: '',
      product_name: '',
      product_quantity: '',
      product_description: '',
      tags: 2,
      price: '',
      lat: 0,
      lan: 0,
      city: '',
      neighborhood: '',
      category_id: '',
    });
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe((param) => {
      this.id = param.get('id') as unknown as number;
      this.getProductDetails(this.id);
    });
  }

  getProductDetails(id: number) {
    this.productService.getProductDetails(id).subscribe((res: any) => {
      if (!res) {
        this.route.navigateByUrl('/not-found');
        return;
      }
      const decode = this.authService.getDecodedAccessToken(
        this.authService.getToken()
      );
      if (decode.role_id == 3 || decode.seller_id == res.seller_id) {
      } else {
        this.route.navigateByUrl('/');
      }
      this.id = res.product_id;
      this.form.setValue({
        product_id: res.product_id,
        product_name: res.product_name,
        product_quantity: res.product_quantity,
        product_description: res.product_description,
        tags: res.tags,
        price: res.price,
        lat: res.lat,
        lan: res.lan,
        city: res.city,
        neighborhood: res.neighborhood,
        category_id: res.category_id,
      });
    });
  }
  updateProduct() {
    this.productService
      .updateProduct(this.form.getRawValue())
      .subscribe((res) => {
        setTimeout(() => {
          this.route.navigateByUrl(`products/${this.id}`);
        }, 1000);

        this.added = true;
      });
  }
}

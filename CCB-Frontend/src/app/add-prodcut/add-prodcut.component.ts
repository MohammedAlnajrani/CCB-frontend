import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { product } from '../Model/product/product';
import { AuthCustomerService } from '../services/auth-customer.service';
import { AuthService } from '../services/customer/auth.service';
import { ProductService } from '../services/product/product.service';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-add-prodcut',
  templateUrl: './add-prodcut.component.html',
  styleUrls: ['./add-prodcut.component.css'],
})
export class AddProdcutComponent implements OnInit {
  form!: FormGroup;
  product: product = {
    product_name: '',
    product_thumbnail: '',
    product_quantity: 0,
    product_description: '',
    tags: '',
    price: 0,
    lat: 0,
    lan: 0,
    city: '',
    qty: 0,
    neighborhood: '',
    seller_id: 0,
    category_id: 0,
  };
  token = this.authCustomer.getDecodedAccessToken(this.authCustomer.getToken());
  sellerID = this.token.seller_id;
  errorMsg = '';
  added: boolean = false;
  files: File[] = [];
  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authCustomer: AuthCustomerService,
    private uploadService: UploadService
  ) {
    this.form = this.formBuilder.group({
      product_name: '',
      product_quantity: '',
      product_thumbnail: '',
      product_description: '',
      tags: '',
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

  onSelect(event: any) {
    console.log(event);
    //only one image per product
    if (this.files.length < 1) {
      this.files.push(...event.addedFiles);
    }
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  upload() {
    if (!this.files[0]) {
      alert('Please add an image');
    }
    const file_data = this.files[0];
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'angular_cloudinary');
    data.append('cloud_name', 'dcwbp2n3u');

    this.uploadService.uploadImage(data).subscribe((res) => {
      const img_url = res.url;
      console.log(`${img_url}`);

      this.form.patchValue({
        product_thumbnail: `${img_url}`,
      });

      this.productService.addProduct(this.form.getRawValue()).subscribe(
        (data: any) => {
          this.errorMsg = '';

          // setTimeout(() => {
          //
          // }, 1000);
          this.router.navigateByUrl(`/products/${data.product_id}`);
        },
        (err) => {
          this.errorMsg = err.error;
        }
      );
    });
  }

  addProduct() {
    this.upload();
    console.log(this.form.getRawValue());
  }
}

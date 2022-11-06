import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { product } from '../Model/product/product';
import { AuthCustomerService } from '../services/auth-customer.service';
import { AuthService } from '../services/customer/auth.service';
import { ProductService } from '../services/product/product.service';
import { UploadService } from '../services/upload.service';
import { google } from 'google-maps';

declare var google: google;
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
  zoom: number = 15;
  lat: number = 21.48987;
  lng: number = 39.246833;
  lastInfoWindow: any;
  marker: any = {};

  countryRestriction = {
    latLngBounds: {
      east: 50.2,
      north: 28.77,
      south: 18,
      west: 38,
    },
    strictBounds: true,
  };

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

  onMapReady(map?: google.maps.Map) {
    if (map)
      map.setOptions({
        streetViewControl: false,
        fullscreenControl: false,
      });
  }

  markerClicked(marker: any, infoWindowRef: any) {
    if (this.lastInfoWindow) {
      this.lastInfoWindow.close();
    }
    this.lastInfoWindow = infoWindowRef;
  }

  async mapClicked($event: any) {
    this.marker = {
      lat: $event.coords.lat,
      lng: $event.coords.lng,

      draggable: true,
    };
    const address: any = await this.getAddress(
      $event.coords.lat,
      $event.coords.lng
    );
    console.log(this.marker.lat);
    console.log(this.marker.lng);
    this.form.patchValue({
      lat: this.marker.lat,
    });
    this.form.patchValue({
      lan: this.marker.lng,
    });

    for (const add of address.address_components) {
      console.log(add);
      if (add.types.includes('political')) {
        console.log('Neighboor ' + add.short_name);
        this.form.patchValue({
          neighborhood: `${add.short_name}`,
        });
        break;
      }
      this.form.patchValue({
        neighborhood: '',
      });
    }
    for (const add of address.address_components) {
      if (add.types.includes('locality')) {
        console.log('City ' + add.short_name);
        this.form.patchValue({
          city: `${add.short_name}`,
        });
        break;
      }
      this.form.patchValue({
        city: '',
      });
    }
  }

  markerDragEnd($event: any) {
    console.log($event.coords.lat);
    console.log($event.coords.lng);
  }

  getAddress(lat: number, lng: number) {
    const geocoder = new google.maps.Geocoder();
    const latlng = new google.maps.LatLng(lat, lng);
    const request: any = {
      latLng: latlng,
    };
    return new Promise((resolve, reject) => {
      geocoder.geocode(request, (results: any) => {
        results.length ? resolve(results[0]) : reject(null);
      });
    });
  }

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

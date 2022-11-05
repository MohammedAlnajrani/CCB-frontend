import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../Model/product/product';
import { AuthCustomerService } from '../services/auth-customer.service';
import { ProductService } from '../services/product/product.service';
import { UploadService } from '../services/upload.service';
import { google } from 'google-maps';

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
    qty: 0,
    category_id: 0,
    product_thumbnail: '',
  };
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
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private productService: ProductService,
    private authService: AuthCustomerService,
    private uploadService: UploadService
  ) {
    this.form = this.formBuilder.group({
      product_id: '',
      product_name: ['', Validators.required],
      product_thumbnail: '',
      product_quantity: '',
      product_description: '',
      tags: '',
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
  onMapReady(map?: google.maps.Map) {
    if (map)
      map.setOptions({
        streetViewControl: false,
        fullscreenControl: false,
      });
    console.log(map);
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
      console.log(res);

      this.id = res.product_id;
      this.form.setValue({
        product_id: res.product_id,
        product_name: res.product_name,
        product_thumbnail: res.product_thumbnail,
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

  updateProduct() {
    if (this.files.length == 1) {
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
        this.productService
          .updateProduct(this.form.getRawValue())
          .subscribe((res) => {
            setTimeout(() => {
              this.route.navigateByUrl(`products/${this.id}`);
            }, 1000);

            this.added = true;
          });
      });
    } else {
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
}

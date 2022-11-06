import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { product } from '../Model/product/product';
import { review } from '../Model/review/review';
import { AuthCustomerService } from '../services/auth-customer.service';
import { CartService } from '../services/cart.service';
import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProductService } from '../services/product/product.service';
import { ReviewService } from '../services/review/review.service';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  id = 0;
  shopName = 'Shop';
  currentRate = 0;
  reviewList: review[] = [];
  isLoggedIn = false;
  averageRating = 0;
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
  auth = false;
  errorMsg = '';
  reviewPost: review = {
    description: '',
    rating: 0,
    product_id: 0,
    customer_id: 0,
    cus_first_name: '',
  };
  url: any;
  santized!: SafeResourceUrl;
  constructor(
    private productService: ProductService,
    private router: ActivatedRoute,
    private review: ReviewService,
    private customerService: AuthCustomerService,
    private token: AuthCustomerService,
    private sellerService: SellerService,
    private authService: AuthCustomerService,
    private route: Router,
    private cartService: CartService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.customerService.isLoggedIn();
    this.router.paramMap.subscribe((param) => {
      this.id = param.get('id') as unknown as number;
      this.getProductDetails(this.id);
      this.getAllReviewByProductID(this.id);
    });
  }

  getProductDetails(id: number) {
    this.productService.getProductDetails(id).subscribe((res) => {
      this.product = res;
      if (this.product == null) {
        this.route.navigateByUrl('/not-found');
      }
      this.url =
        'https://www.google.com/maps/embed/v1/place?key=AIzaSyB9mWCmDoK-CHJO491k4R_R4ZyF4w-Dp84&q=' +
        this.product.lat +
        ',' +
        this.product.lan +
        '';

      let sanitizedUrl: SafeResourceUrl = this.sanitizer.sanitize(
        SecurityContext.URL,
        this.url.toString()
      ) as unknown as string;
      console.log(this.url);
      this.santized = this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://maps.google.com/maps?q=21.48123371708128,39.19007964217564&hl=en&z=14&amp;output=embed'
      );

      this.getSellerInfo();
      const decode = this.authService.getDecodedAccessToken(
        this.authService.getToken()
      );
      if (decode != null) {
        if (decode.role_id == 3 || decode.seller_id == this.product.seller_id) {
          this.auth = true;
        }
      }
    });
  }

  getAllReviewByProductID(id: number) {
    this.review.getAllReviewByProductID(id).subscribe((res) => {
      this.reviewList = res;
      for (let i = 0; i < this.reviewList.length; i++) {
        this.reviewList[i].created_at = moment(
          this.reviewList[i].created_at
        ).format('MMMM D YYYY');
      }
      this.avgReview();
    });
  }

  postReview() {
    //get token through token service
    const token = this.token.getToken();
    //decode token by passing it to the method
    const decode = this.token.getDecodedAccessToken(token);
    //get customer id from decoded token
    const customerID = decode.customer_id;
    //pass id to getcustomerbyid method

    this.reviewPost = {
      description: this.reviewPost.description,
      rating: this.currentRate,
      product_id: this.id,
      customer_id: customerID,
      cus_first_name: decode.cus_first_name,
    };

    if (this.reviewPost.rating < 1 || this.reviewPost.rating > 5) {
      this.errorMsg = 'Invalid rating rating must be between 1 and 5';
      return;
    }

    this.review.postReview(this.reviewPost).subscribe(
      (data: any) => {
        console.log(data);
        window.location.reload();
      },
      (err) => {
        this.errorMsg = err.error;
        console.log(this.errorMsg);
      }
    );
  }

  avgReview() {
    if (this.reviewList.length == 0) return;

    for (let i = 0; i < this.reviewList.length; i++) {
      this.averageRating += this.reviewList[i].rating;
    }

    this.averageRating = this.averageRating / this.reviewList.length;
    console.log(this.averageRating);
  }
  onRateClick(event: any) {
    this.currentRate = event;
    console.log(this.currentRate);
  }

  getSellerInfo() {
    this.sellerService
      .getSellerById(this.product.seller_id)
      .subscribe((res) => {
        this.shopName = res.shop_name;
        console.log(this.shopName);
      });
  }

  addToCart(product: product) {
    this.cartService.addItem(product);
  }
}

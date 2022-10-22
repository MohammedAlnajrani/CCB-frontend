import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../Model/product/product';
import { review } from '../Model/review/review';
import { AuthCustomerService } from '../services/auth-customer.service';
import { AuthService } from '../services/customer/auth.service';
import { ProductService } from '../services/product/product.service';
import { ReviewService } from '../services/review/review.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  id = 0;
  currentRate = 0;
  reviewList: review[] = [];
  isLoggedIn = false;
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
  errorMsg = '';
  reviewPost: review = {
    description: '',
    rating: 0,
    product_id: 0,
    customer_id: 0,
  };
  constructor(
    private productService: ProductService,
    private router: ActivatedRoute,
    private review: ReviewService,
    private customerService: AuthCustomerService,
    private token: AuthCustomerService
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
    });
  }

  getAllReviewByProductID(id: number) {
    this.review.getAllReviewByProductID(id).subscribe((res) => {
      this.reviewList = res;
      console.log(this.reviewList);
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
    };

    console.log(this.reviewPost);

    this.review.postReview(this.reviewPost).subscribe(
      (data: any) => {
        console.log(data);
      },
      (err) => {
        this.errorMsg = err.error;
        console.log(this.errorMsg);
      }
    );
  }

  onRateClick(event: any) {
    this.currentRate = event;
    console.log(this.currentRate);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../Model/product/product';
import { review } from '../Model/review/review';
import { AuthCustomerService } from '../services/auth-customer.service';
import { AuthService } from '../services/customer/auth.service';
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
  shopName = "Shop";
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
    category_id: 0,
  };
  errorMsg = '';
  reviewPost: review = {
    description: '',
    rating: 0,
    product_id: 0,
    customer_id: 0,
    cus_first_name: '',
  };
  constructor(
    private productService: ProductService,
    private router: ActivatedRoute,
    private review: ReviewService,
    private customerService: AuthCustomerService,
    private token: AuthCustomerService,
    private sellerService: SellerService
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
      this.getSellerInfo();
    });
  }

  getAllReviewByProductID(id: number) {
    this.review.getAllReviewByProductID(id).subscribe((res) => {
      this.reviewList = res;
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

    console.log(this.reviewPost);

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

  getSellerInfo(){
    this.sellerService.getSellerById(this.product.seller_id).subscribe(res => {
      this.shopName = res.shop_name;
      console.log(this.shopName)
    })
  }
}

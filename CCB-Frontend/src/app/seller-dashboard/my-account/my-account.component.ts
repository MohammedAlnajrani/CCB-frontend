import { Component, OnInit } from '@angular/core';
import { seller } from 'src/app/Model/seller/seller';
import { AuthCustomerService } from 'src/app/services/auth-customer.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent implements OnInit {
  seller: seller = {
    seller_email: '',
    seller_password: '',
    shop_name: '',
    role_id: 0,
  };
  constructor(
    private sellerService: SellerService,
    private customerAuth: AuthCustomerService
  ) {}

  ngOnInit(): void {
    this.getSellerInfo();
  }

  getSellerInfo() {
    const decode = this.customerAuth.getDecodedAccessToken(
      this.customerAuth.getToken()
    );
    this.seller = decode;
    console.log(this.seller);
  }
}

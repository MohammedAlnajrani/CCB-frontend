import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { seller } from 'src/app/Model/seller/seller';
import { AuthCustomerService } from 'src/app/services/auth-customer.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent implements OnInit {
  errorMsg = '';
  form!: FormGroup;
  seller: seller = {
    seller_email: '',
    seller_password: '',
    shop_name: '',
    role_id: 0,
  };
  constructor(
    private sellerService: SellerService,
    private customerAuth: AuthCustomerService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      seller_email: '',
      seller_password: '',
      shop_name: '',
      seller_id: '',
    });
  }

  ngOnInit(): void {
    this.getSellerInfo();
  }

  getSellerInfo() {
    const decode = this.customerAuth.getDecodedAccessToken(
      this.customerAuth.getToken()
    );
    this.seller = decode;
    this.form.setValue({
      seller_email: decode.seller_email,
      seller_password: '',
      shop_name: decode.shop_name,
      seller_id: decode.seller_id,
    });
  }
  updateSeller() {}
}

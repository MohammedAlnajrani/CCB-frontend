import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { seller } from 'src/app/Model/seller/seller';
import { AuthCustomerService } from 'src/app/services/auth-customer.service';
import { AuthService } from 'src/app/services/customer/auth.service';

@Component({
  selector: 'app-seller-register',
  templateUrl: './seller-register.component.html',
  styleUrls: ['./seller-register.component.css'],
})
export class SellerRegisterComponent implements OnInit {
  form!: FormGroup;
  seller: seller = {
    seller_email: '',
    seller_password: '',
    shop_name: '',
    role_id: 2,
  };
  errorMsg = '';
  registered: boolean = false;
  constructor(
    private customerService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authCustomer: AuthCustomerService
  ) {
    this.form = this.formBuilder.group({
      seller_email: ['', Validators.required],
      seller_password: ['', [Validators.required, Validators.minLength(8)]],
      shop_name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.authCustomer.isLoggedIn()) this.router.navigateByUrl('/');
  }

  registerSeller() {
    this.customerService.sellerRegister(this.form.getRawValue()).subscribe(
      (data: any) => {
        this.errorMsg = '';
        this.registered = true;
        console.log(data);
        setTimeout(() => {
          this.router.navigateByUrl('account/seller-login');
        }, 1000);
      },
      (err) => {
        this.errorMsg = err.error;
      }
    );
  }
}

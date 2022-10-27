import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthCustomerService } from 'src/app/services/auth-customer.service';
import { AuthService } from 'src/app/services/customer/auth.service';

@Component({
  selector: 'app-seller-login',
  templateUrl: './seller-login.component.html',
  styleUrls: ['./seller-login.component.css'],
})
export class SellerLoginComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private customerService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authCustomer: AuthCustomerService
  ) {}
  errorMsg = '';

  ngOnInit(): void {
    if (this.authCustomer.isLoggedIn()) this.router.navigateByUrl('/');
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  loginSeller() {
    console.log(this.form.getRawValue());
    this.customerService.sellerLogin(this.form.getRawValue()).subscribe(
      (data: any) => {
        this.router.navigate(['/']);
        window.location.reload();
      },
      (err) => {
        this.errorMsg = err.error;
      }
    );
  }
}

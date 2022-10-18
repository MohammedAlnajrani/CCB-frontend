import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthCustomerService } from 'src/app/services/auth-customer.service';
import { AuthService } from 'src/app/services/customer/auth.service';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css'],
})
export class CustomerLoginComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private customerService: AuthService,
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

  loginCustomer() {
    this.customerService.customerLogin(this.form.getRawValue()).subscribe(
      (data: any) => {
        console.log(this.authCustomer.getToken());
        this.router.navigate(['/']);
        window.location.reload();
      },
      (err) => {
        this.errorMsg = err.error;
      }
    );
  }
}

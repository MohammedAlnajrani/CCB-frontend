import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { customer } from 'src/app/Model/customer/customer';
import { AuthCustomerService } from 'src/app/services/auth-customer.service';
import { AuthService } from 'src/app/services/customer/auth.service';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css'],
})
export class CustomerPageComponent implements OnInit {
  form!: FormGroup;

  customer: customer = {
    customer_email: '',
    cus_first_name: '',
    cus_last_name: '',
    customer_password: '',
    role_id: 1,
  };
  errorMsg = '';
  registered: boolean = false;
  constructor(
    private customerSerive: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authCustomer: AuthCustomerService
  ) {}

  ngOnInit(): void {
    if (this.authCustomer.isLoggedIn()) this.router.navigateByUrl('/');
    this.form = this.formBuilder.group({
      customer_email: ['', Validators.required],
      cus_first_name: ['', Validators.required],
      cus_last_name: ['', Validators.required],
      customer_password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  registerCustomer() {
    this.customerSerive.customerRegister(this.form.getRawValue()).subscribe(
      (data: any) => {
        this.errorMsg = '';
        this.registered = true;
        //wait 2 seconds and navigate
        setTimeout(() => {
          this.router.navigateByUrl('account/login');
        }, 1000);
      },
      (err) => {
        this.errorMsg = err.error;
      }
    );
  }
}

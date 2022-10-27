import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthCustomerService } from '../services/auth-customer.service';

@Component({
  selector: 'app-login-option',
  templateUrl: './login-option.component.html',
  styleUrls: ['./login-option.component.css'],
})
export class LoginOptionComponent implements OnInit {
  constructor(
    private authCustomer: AuthCustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authCustomer.isLoggedIn()) this.router.navigateByUrl('/');
  }
}

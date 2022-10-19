import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { AuthCustomerService } from '../services/auth-customer.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  public isCollapsed = true;
  isLoggedIn = false;
  constructor(
    private route: Router,
    private customerAuth: AuthCustomerService
  ) {}

  ngOnInit(): void {
    if (this.customerAuth.isLoggedIn()) this.isLoggedIn = true;
    const token = this.customerAuth.getToken();
    const decode = this.customerAuth.getDecodedAccessToken(token);
    console.log(decode.customer_id);
  }

  logout() {
    this.customerAuth.logout();
    window.location.reload();
  }
}

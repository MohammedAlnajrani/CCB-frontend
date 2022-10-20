import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { AuthCustomerService } from '../services/auth-customer.service';
import { CategoryService } from '../services/category/category.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  categoryList: any[] = [];
  public isCollapsed = true;
  isLoggedIn = false;
  constructor(
    private route: Router,
    private customerAuth: AuthCustomerService,
    private category: CategoryService
  ) {}

  ngOnInit(): void {
    if (this.customerAuth.isLoggedIn()) {
      this.isLoggedIn = true;
      const token = this.customerAuth.getToken();
      const decode = this.customerAuth.getDecodedAccessToken(token);
      console.log(decode.customer_id);
    }
    this.getCategories();
  }

  getCategories() {
    this.category.getAllCategories().subscribe((res) => {
      this.categoryList = res;
    });
  }

  logout() {
    this.customerAuth.logout();
    window.location.reload();
  }
}

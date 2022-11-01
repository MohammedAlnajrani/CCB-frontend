import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  isSeller = false;
  decode: any = '';
  query = '';
  city = '';
  form!: FormGroup;
  constructor(
    private route: Router,
    private customerAuth: AuthCustomerService,
    private category: CategoryService,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      query: '',
      city: '',
    });
  }

  ngOnInit(): void {
    if (this.customerAuth.isLoggedIn()) {
      this.isLoggedIn = true;
      const token = this.customerAuth.getToken();
      this.decode = this.customerAuth.getDecodedAccessToken(token);
      if (this.decode.role_id == 2 || this.decode.role_id == 3) {
        this.isSeller = true;
      }
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

  search() {
    if (this.city.length < 2)
      this.route.navigateByUrl(`/search?q=${this.query}&city=all`);
    else this.route.navigateByUrl(`/search?q=${this.query}&city=${this.city}`);
  }
}

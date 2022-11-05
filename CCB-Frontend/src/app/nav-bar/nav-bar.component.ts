import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { AuthCustomerService } from '../services/auth-customer.service';
import { CartService } from '../services/cart.service';
import { CategoryService } from '../services/category/category.service';
import { ProductService } from '../services/product/product.service';

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
  isAdmin = false;
  decode: any = '';
  query = '';
  city = '';
  cities: any[] = [];
  form!: FormGroup;
  itemsInCart: any = 0;
  constructor(
    private route: Router,
    private customerAuth: AuthCustomerService,
    private category: CategoryService,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private productService: ProductService
  ) {
    this.form = this.formBuilder.group({
      query: '',
      city: '',
    });
  }

  ngOnInit(): void {
    this.getCities();
    this.cartService.numberOfItems.subscribe((res: any) => {
      this.itemsInCart = res.length;
    });
    if (this.customerAuth.isLoggedIn()) {
      this.isLoggedIn = true;
      const token = this.customerAuth.getToken();
      this.decode = this.customerAuth.getDecodedAccessToken(token);
      if (this.decode.role_id == 2) {
        this.isSeller = true;
      } else if (this.decode.role_id == 3) {
        this.isAdmin = true;
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

  getCities() {
    this.productService.getAllCities().subscribe((res) => {
      this.cities = res;
    });
  }
}

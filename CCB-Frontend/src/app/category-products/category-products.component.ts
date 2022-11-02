import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../Model/product/product';
import { CartService } from '../services/cart.service';
import { CategoryService } from '../services/category/category.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css'],
})
export class CategoryProductsComponent implements OnInit {
  id = 0;

  productsList: product[] = [];

  constructor(
    private category: CategoryService,
    private router: ActivatedRoute,
    private redirect: Router,
    private cartService: CartService
  ) {
    this.id = this.router.snapshot.params.id;
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe((param) => {
      this.id = param.get('id') as unknown as number;
      this.getCategoryProducts(this.id);
    });
  }

  getCategoryProducts(id: number) {
    this.category.getProductsByCategory(id).subscribe((res) => {
      this.productsList = res;
      console.log(this.productsList);
    });

    this.category.getProductsByCategory(id).subscribe(
      (data) => {
        this.productsList = data;
      },
      (err) => {
        this.redirect.navigateByUrl('/not-found');
      }
    );
  }
  addToCart(product: product) {
    this.cartService.addItem(product);
  }
}

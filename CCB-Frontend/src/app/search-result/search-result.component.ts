import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../Model/product/product';
import { CartService } from '../services/cart.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  query = '';
  city = '';
  productList: product[] = [];
  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.searchProduct();
  }

  searchProduct() {
    this.route.queryParams.subscribe((res) => {
      this.query = res.q;
      if (res.city != null) this.city = res.city;
      this.searchService
        .searchProduct(this.query, this.city)
        .subscribe((res) => {
          this.productList = res;
        });
    });
  }

  addToCart(product: product) {
    this.cartService.addItem(product);
  }

}

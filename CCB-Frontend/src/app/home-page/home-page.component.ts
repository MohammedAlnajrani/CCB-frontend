import { Component, OnInit } from '@angular/core';
import { product } from '../Model/product/product';
import { HomeService } from '../services/home/home.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  newProducts: product[] = [];
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.getLatestProduct();
  }

  getLatestProduct() {
    this.homeService.getLatestProducts().subscribe((res) => {
      console.log(res);
      this.newProducts = res;
      for (let i = 0; i < this.newProducts.length; i++) {
        this.newProducts[i].product_description =
          this.newProducts[i].product_description.substring(0, 120) + '...';
      }
    });
  }

  productDescription() {}
}

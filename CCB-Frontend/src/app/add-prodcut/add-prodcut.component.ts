import { Component, OnInit } from '@angular/core';
import { product } from '../Model/product/product';

@Component({
  selector: 'app-add-prodcut',
  templateUrl: './add-prodcut.component.html',
  styleUrls: ['./add-prodcut.component.css'],
})
export class AddProdcutComponent implements OnInit {
  product: product = {
    product_name: '',
    product_quantity: 0,
    product_description: '',
    tags: '',
    price: 0,
    lat: 0,
    lan: 0,
    city: '',
    neighborhood: '',
    seller_id: 0,
    category_id: 0,
  };
  constructor() {}

  ngOnInit(): void {}
}

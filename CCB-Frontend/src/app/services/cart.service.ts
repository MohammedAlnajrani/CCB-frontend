import { Injectable } from '@angular/core';
import { product } from '../Model/product/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: any[] = [];
  temp: any[] = [];
  numberOfItems: any = new BehaviorSubject([]);

  constructor() {
    const storage = this.getCart();
    if (storage) this.numberOfItems.next(storage);
  }

  addItem(product: product) {
    const storage = this.getCart();
    let exist: product = {
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
      qty: 0,
      category_id: 0,
      product_thumbnail: '',
    };

    if (storage)
      exist = storage.find((item: any) => {
        return item.product_id === product.product_id;
      });

    if (exist) {
      if (exist.qty < product.product_quantity) {
        exist.qty++;
        this.setCart(storage);
      }
    } else {
      if (storage) {
        product.qty = 1;
        const newData = [...storage, product];
        this.setCart(newData);
      }
      product.qty = 1;
      this.temp.push(product);
      this.setCart(this.temp);
    }
  }

  setCart(data: any) {
    localStorage.setItem('cart', JSON.stringify(data));
    this.numberOfItems.next(this.getCart());
  }

  getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
}

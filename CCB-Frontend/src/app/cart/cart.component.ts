import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../Model/product/product';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: product[] = [];
  total: number = 0;
  errorMsg = '';
  bought = false;
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.numberOfItems.subscribe((res: any) => {
      this.items = res;
      this.cartService.setCart(this.items);
      this.calculateTotal(this.items);
    });
  }

  removeProduct(index: number) {
    this.items.splice(index, 1);
    this.cartService.setCart(this.items);
    this.calculateTotal(this.items);
    window.location.reload();
  }
  validateQuantity(event: any, index: number) {
    console.log(this.items[index].qty);
    const qty = +event.target.value;
    if (qty > this.items[index].product_quantity) {
      event.target.value = this.items[index].qty;
      return;
    }
    if (qty < 1) {
      event.target.value = this.items[index].qty;
      return;
    }
    this.updateQty(qty, index);
    this.calculateTotal(this.items);
  }
  updateQty(qty: number, index: number) {
    this.items[index].qty = qty;
    this.cartService.setCart(this.items);
  }
  clearAllProducts() {
    this.items = [];
    this.cartService.setCart(this.items);
    // window.location.reload();
  }
  checkout() {
    this.orderService.checkout(this.items).subscribe(
      (res: any) => {
        this.bought = true;
        console.log(res);

        setTimeout(() => {
          this.clearAllProducts();
          this.router.navigateByUrl(`order/${res.order_id}`);
        }, 2000);
      },
      (err) => {
        this.errorMsg = err.error;
      }
    );
  }

  calculateTotal(data: any) {
    let tempTotal = 0;
    for (const item of data) {
      tempTotal += item.price * item.qty;
      this.total = tempTotal;
    }
  }
}

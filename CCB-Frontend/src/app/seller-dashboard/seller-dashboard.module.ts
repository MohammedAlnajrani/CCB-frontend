import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerDashboardRoutingModule } from './seller-dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LayoutComponent,
    MyAccountComponent,
    OrdersComponent,
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    SellerDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SellerDashboardModule {}

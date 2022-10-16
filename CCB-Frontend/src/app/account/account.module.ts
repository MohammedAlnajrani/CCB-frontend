import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SellerLoginComponent } from './seller-login/seller-login.component';
import { SellerRegisterComponent } from './seller-register/seller-register.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerPageComponent } from './customer-page/customer-page.component';

@NgModule({
  declarations: [
    LayoutComponent,
    SellerLoginComponent,
    SellerRegisterComponent,
    CustomerLoginComponent,
    CustomerPageComponent,
  ],
  imports: [CommonModule, AccountRoutingModule],
})
export class AccountModule {}

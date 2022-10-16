import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerPageComponent } from './customer-page/customer-page.component';
import { LayoutComponent } from './layout/layout.component';
import { SellerLoginComponent } from './seller-login/seller-login.component';
import { SellerRegisterComponent } from './seller-register/seller-register.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'login', component: CustomerLoginComponent },
      { path: 'register', component: CustomerPageComponent },
      { path: 'seller-register', component: SellerRegisterComponent },
      { path: 'seller-login', component: SellerLoginComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}

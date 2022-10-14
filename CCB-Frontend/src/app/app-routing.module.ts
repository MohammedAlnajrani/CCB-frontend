import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerPageComponent } from './customer-page/customer-page.component';
import { SellerRegisterComponent } from './seller-register/seller-register.component';
 

const routes: Routes = [
  {
    path: 'login',
    component: CustomerLoginComponent,
  },
  { path: 'register', component: CustomerPageComponent },
  { path:'seller-register', component: SellerRegisterComponent },
  { path: '**', component: NotFoundComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

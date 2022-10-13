import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerPageComponent } from './customer-page/customer-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: CustomerLoginComponent,
  },
  { path: 'register', component: CustomerPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

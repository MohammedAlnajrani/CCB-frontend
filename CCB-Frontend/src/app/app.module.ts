import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerPageComponent } from './customer-page/customer-page.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CompatibilityComponent } from './components/compatibility/compatibility.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SellerRegisterComponent } from './seller-register/seller-register.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerPageComponent,
    CustomerLoginComponent,
    NavBarComponent,
    NotFoundComponent,
    CompatibilityComponent,
    SellerRegisterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

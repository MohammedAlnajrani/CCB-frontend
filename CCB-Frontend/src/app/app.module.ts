import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CompatibilityComponent } from './components/compatibility/compatibility.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SellerProfileComponent } from './components/seller-profile/seller-profile.component';
import { CpuComponent } from './components/compatibility/cpu/cpu.component';
import { MotherboardComponent } from './components/compatibility/motherboard/motherboard.component';
import { MemoryComponent } from './components/compatibility/memory/memory.component';
import { GpuComponent } from './components/compatibility/gpu/gpu.component';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardGuard } from './auth-guards/auth-guard.guard';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { CategoryProductsComponent } from './category-products/category-products.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { AddProdcutComponent } from './add-prodcut/add-prodcut.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { LoginOptionComponent } from './login-option/login-option.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { OrderDetailsSellerComponent } from './order-details-seller/order-details-seller.component';
import { CartComponent } from './cart/cart.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    NotFoundComponent,
    CompatibilityComponent,
    SellerProfileComponent,
    CpuComponent,
    MotherboardComponent,
    MemoryComponent,
    GpuComponent,
    HomePageComponent,
    ProductDetailComponent,
    CustomerProfileComponent,
    CustomerOrdersComponent,
    CategoryProductsComponent,
    AdminDashboardComponent,
    FooterComponent,
    AddProdcutComponent,
    SearchResultComponent,
    LoginOptionComponent,
    SellerDashboardComponent,
    OrderDetailsComponent,
    EditProductComponent,
    OrderDetailsSellerComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
  ],
  providers: [AuthGuardGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

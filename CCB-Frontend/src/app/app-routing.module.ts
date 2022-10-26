import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth-guards/auth-guard.guard';
import { CompatibilityComponent } from './components/compatibility/compatibility.component';
import { CpuComponent } from './components/compatibility/cpu/cpu.component';
import { GpuComponent } from './components/compatibility/gpu/gpu.component';
import { MemoryComponent } from './components/compatibility/memory/memory.component';
import { MotherboardComponent } from './components/compatibility/motherboard/motherboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SellerProfileComponent } from './components/seller-profile/seller-profile.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { CategoryProductsComponent } from './category-products/category-products.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddProdcutComponent } from './add-prodcut/add-prodcut.component';
import { IsCustomerGuard } from './auth-guards/is-customer.guard';
import { IsSellerGuard } from './auth-guards/is-seller.guard';
import { IsAdminGuard } from './auth-guards/is-admin.guard';

const accountModule = () =>
  import('./account/account.module').then((x) => x.AccountModule);
const routes: Routes = [
  { path: 'account', loadChildren: accountModule },
  { path: 'seller-profile/:id', component: SellerProfileComponent },
  { path: 'compatibility', component: CompatibilityComponent },
  { path: 'compatibility/cpu', component: CpuComponent },
  { path: 'compatibility/motherboard', component: MotherboardComponent },
  { path: 'compatibility/memory', component: MemoryComponent },
  { path: 'compatibility/gpu', component: GpuComponent },
  { path: 'product-detail', component: ProductDetailComponent },
  { path: '', component: HomePageComponent },
  {
    path: 'orders',
    component: CustomerOrdersComponent,
    canActivate: [AuthGuardGuard, IsCustomerGuard],
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuardGuard, IsAdminGuard],
  },
  { path: 'products/category/:id', component: CategoryProductsComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  {
    path: 'add-product',
    component: AddProdcutComponent,
    canActivate: [AuthGuardGuard, IsSellerGuard],
  },
  {
    path: 'profile',
    component: CustomerProfileComponent,
    canActivate: [AuthGuardGuard, IsCustomerGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

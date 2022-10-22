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
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";

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
  { path: 'orders', component: CustomerOrdersComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'products/category/:id', component: CategoryProductsComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  {
    path: 'profile',
    component: CustomerProfileComponent,
    canActivate: [AuthGuardGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

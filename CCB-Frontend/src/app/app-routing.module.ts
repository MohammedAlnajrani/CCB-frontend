import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompatibilityComponent } from './components/compatibility/compatibility.component';
import { CpuComponent } from './components/compatibility/cpu/cpu.component';
import { GpuComponent } from './components/compatibility/gpu/gpu.component';
import { MemoryComponent } from './components/compatibility/memory/memory.component';
import { MotherboardComponent } from './components/compatibility/motherboard/motherboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SellerProfileComponent } from './components/seller-profile/seller-profile.component';

const accountModule = () =>
  import('./account/account.module').then((x) => x.AccountModule);
const routes: Routes = [
  { path: 'account', loadChildren: accountModule },
  { path: 'seller-profile', component: SellerProfileComponent },
  { path: 'compatibility', component: CompatibilityComponent },
  { path: 'compatibility/cpu', component: CpuComponent },
  { path: 'compatibility/motherboard', component: MotherboardComponent },
  { path: 'compatibility/memory', component: MemoryComponent },
  { path: 'compatibility/gpu', component: GpuComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

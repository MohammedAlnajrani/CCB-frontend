import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SellerProfileComponent } from './components/seller-profile/seller-profile.component';

const accountModule = () =>
  import('./account/account.module').then((x) => x.AccountModule);
const routes: Routes = [
  { path: 'account', loadChildren: accountModule },
  { path: 'seller-profile', component: SellerProfileComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardGuard } from './auth-guards/auth-guard.guard';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';

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
    CustomerProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuardGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}

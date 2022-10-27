import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthCustomerService } from '../services/auth-customer.service';

@Injectable({
  providedIn: 'root',
})
export class IsCustomerGuard implements CanActivate {
  constructor(
    private customerAuth: AuthCustomerService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.customerAuth.isCustomer()) {
      this.router.navigateByUrl('/');
      return false;
    } else {
      return true;
    }
  }
}

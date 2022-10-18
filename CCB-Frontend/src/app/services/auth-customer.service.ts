import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthCustomerService {
  constructor(private cookieService: CookieService) {}

  isLoggedIn(): boolean {
    if (this.cookieService.get('token').length > 5) {
      return true;
    } else return false;
  }

  getToken() {
    return this.cookieService.get('token');
  }

  logout() {
    this.cookieService.delete('token');
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}

import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

let api = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class AuthCustomerService {
  constructor(private cookieService: CookieService, private http: HttpClient) {}

  isLoggedIn(): boolean {
    if (this.cookieService.get('token').length > 5) {
      return true;
    } else return false;
  }

  getToken() {
    return this.cookieService.get('token');
  }

  logout() {
    this.cookieService.delete('token', '/');

    // this.http.get(`${api}/logout`, { withCredentials: true });
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}

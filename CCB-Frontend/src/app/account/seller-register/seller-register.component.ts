import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/customer/auth.service';

@Component({
  selector: 'app-seller-register',
  templateUrl: './seller-register.component.html',
  styleUrls: ['./seller-register.component.css']
})
export class SellerRegisterComponent implements OnInit {

  constructor(private customerService: AuthService) { }

  ngOnInit(): void {
  }

  registerSeller(){
    this.customerService.sellerRegister()
  }

}

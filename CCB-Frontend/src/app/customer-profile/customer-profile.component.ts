import { Component, OnInit } from '@angular/core';
import { customer } from '../Model/customer/customer';
import { AuthCustomerService } from '../services/auth-customer.service';
import { AuthService } from '../services/customer/auth.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css'],
})
export class CustomerProfileComponent implements OnInit {
  customer: customer = {
    customer_id: 0,
    customer_email: '',
    cus_first_name: '',
    cus_last_name: '',
    customer_password: '',
    role_id: 0,
  };
  constructor(
    private customerAuth: AuthService,
    private token: AuthCustomerService
  ) {}

  ngOnInit(): void {
    this.getCustomerById();
  }

  getCustomerById() {
    //get token through token service
    const token = this.token.getToken();
    //decode token by passing it to the method
    const decode = this.token.getDecodedAccessToken(token);
    //get customer id from decoded token
    const id = decode.customer_id;
    //pass id to getcustomerbyid method
    this.customerAuth.getCustomerById(id).subscribe((res) => {
      this.customer = res;
      console.log(this.customer);
    });
  }

  //TODO: create a function to update customer by id, get their id from this.customer.customr_id
}

import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from 'src/app/services/admin-dashboard/admin-dashboard.service';
import { customer } from 'src/app/Model/customer/customer';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  closeResult = '';
  customerList: customer[] = [];
  customer7Days: any;
  constructor(
    private adminDashboard: AdminDashboardService,
    private modalService: NgbModal
  ) { }

  open(content: any, customer: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          // this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    console.log(customer);
  }

  ngOnInit(): void {
    this.customerLast7Days();
    this.getAllCustomers();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  getAllCustomers() {
    this.adminDashboard.getAllCustomers().subscribe((res) => {
      this.customerList = res;
      for (let i = 0; i < this.customerList.length; i++) {
        this.customerList[i].created_at = moment(
          this.customerList[i].created_at
        ).format('MM/DD/YY');
      }
    });
  }
  customerLast7Days() {
    this.adminDashboard.customerLast7Days().subscribe((res: any) => {
      this.customer7Days = res[0].count;
    });
  }

  deleteCustomer(customer: customer) {
    if (
      confirm(
        `Are you sure you want to delete customer with id ${customer.customer_id}`
      )
    ) {
      this.adminDashboard
        .deleteCustomer(customer.customer_id)
        .subscribe((res) => {
          window.location.reload();
        });
    } else {
      console.log(customer.customer_id + ' cancel');
    }
  }
}

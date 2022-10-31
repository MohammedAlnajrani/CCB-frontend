import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from 'src/app/services/admin-dashboard/admin-dashboard.service';
import { seller } from 'src/app/Model/seller/seller';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css'],
})
export class SellersComponent implements OnInit {
  closeResult = '';
  sellerList: seller[] = [];
  seller7Days: any;
  constructor(
    private adminDashboard: AdminDashboardService,
    private modalService: NgbModal
  ) {}

  open(content: any, seller: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  ngOnInit(): void {
    this.getAllSellers();
    this.sellerLast7days();
  }

  getAllSellers() {
    this.adminDashboard.getTotalSellers().subscribe((res) => {
      this.sellerList = res;
      for (let i = 0; i < this.sellerList.length; i++) {
        this.sellerList[i].created_at = moment(
          this.sellerList[i].created_at
        ).format('MM/DD/YY');
      }
    });
  }

  deleteSeller(seller: seller) {
    if (
      confirm(
        `Are you sure you want to delete seller with id ${seller.seller_id}`
      )
    ) {
      this.adminDashboard.deleteSeller(seller.seller_id).subscribe((res) => {
        window.location.reload();
      });
    } else {
      console.log(seller.seller_id + ' cancel');
    }
  }

  sellerLast7days() {
    this.adminDashboard.sellerLast7Days().subscribe((res: any) => {
      this.seller7Days = res[0].count;
      console.log(res);
    });
  }
}

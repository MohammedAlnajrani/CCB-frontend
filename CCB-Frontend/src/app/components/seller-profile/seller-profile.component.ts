import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SellerService } from 'src/app/services/seller.service';
import { seller } from 'src/app/Model/seller/seller';
import { product } from 'src/app/Model/product/product';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.css']
})
export class SellerProfileComponent implements OnInit {
id = 0;
sellerInfo: seller = {
  seller_email: '',
  seller_password: '',
  shop_name: '',
  role_id: 0
}

productList: product[] = [];
  constructor(private sellerService:SellerService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe((param) => {
      this.id = param.get('id') as unknown as number;
      this.getSellerInfo(this.id);
      this.getSellersProducts(this.id);
    });
  }

  getSellerInfo(id: number){
    this.sellerService.getSellerById(id).subscribe(res => {
      this.sellerInfo = res;
      console.log(res);
    })
  }
  getSellersProducts(id:number){
    this.sellerService.getAllProductsFromSeller(id).subscribe(res => {
      this.productList = res;
      console.log(this.productList)
    })
  }

}

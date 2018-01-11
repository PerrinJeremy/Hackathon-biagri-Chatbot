import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private dash: DashboardService) { }

  list;
  isLoading1 = true;
  isLoading2 = true;
  isLoading3 = true;
  packages;
  sale;

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.dash.getSupplyProductList().subscribe(product => {
      this.list = product;
      this.isLoading1 = false;
    });
    this.dash.getCollectionProductList().subscribe(cereal => {
      this.sale = cereal;
      this.isLoading2 = false;
    });
    this.dash.getPackagingList().subscribe(pack => {
      this.packages = pack;
      this.isLoading3 = false;
    });
  }
}

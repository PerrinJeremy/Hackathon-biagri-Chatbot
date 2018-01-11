import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dash: DashboardService) { }
  list;
  sale;
  farmers;
  isLoading1 = true;
  isLoading2 = true;
  isLoading3 = true;

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
    this.dash.getFarmerList().subscribe(data => {
      this.farmers = data;
      console.log(this.farmers.farmers);
      this.isLoading3 = false;
    });
  }
}

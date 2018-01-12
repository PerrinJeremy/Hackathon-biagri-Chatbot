import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { OfferService } from '../services/offer.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  constructor(public dash: DashboardService, public offer: OfferService) { }

  products = [];
  product: string;
  prodId: number;
  offers;

  ngOnInit() {
  }

  getProductId() {
    this.products = [];
    this.dash.getCollectionProductList().subscribe(data => {
      this.products = data.products;
      for (const item of this.products) {
        console.log(item);
        if (item.abbreviation === this.product || item.name === this.product) {
          this.prodId = item.id;
        }
      }
      if (this.prodId) {
        return this.prodId;
      }
    });
  }
  getOffer() {
    this.dash.getCollectionProduct().subscribe(data => {
      this.offers = data;
      console.log(this.offers);
    });
    if (this.offers) {
      return this.offers.description;
    }
  }
}

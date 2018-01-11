import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { OfferService } from '../services/offer.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  constructor(private dash: DashboardService, private offer: OfferService) { }

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
        this.getOffer();
      }
    });
  }
  getOffer() {
    this.offer.getOfferList(this.prodId).subscribe(data => {
      this.offers = data;
    });
  }
}

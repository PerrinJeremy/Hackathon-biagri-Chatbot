import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DashboardService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(public http: Http) { }
prod;
  // Products

  getSupplyProductList() {
    return this.http.get('http://hackathon-api-biagri.herokuapp.com/supply/products').map(res => res.json());
  }
  getSupplyProduct() {
    this.http.get('http://hackathon-api-biagri.herokuapp.com/supply/products/2').map(res => res.json());
  }
  getCollectionProductList() {
    return this.http.get('http://hackathon-api-biagri.herokuapp.com/collection/products').map(res => res.json());
  }
  getCollectionProduct() {
    this.http.get('http://hackathon-api-biagri.herokuapp.com/collection/products/2').map(res => res.json()).subscribe(data => {
      this.prod = data.description;
    });
    return this.prod;
  }
  /* getProdDescription() {
    this.getCollectionProduct(2).subscribe(data => {
      this.prod = data.description;
    });
    return this.prod;
  } */
  // Farmers

  getFarmerList() {
    return this.http.get('http://hackathon-api-biagri.herokuapp.com/farmers').map(res => res.json());
  }
  getFarmer(id) {
    return this.http.get(`http://hackathon-api-biagri.herokuapp.com/farmers/${id}`).map(res => res.json());
  }

  // Packaging

  getPackagingList() {
    return this.http.get('http://hackathon-api-biagri.herokuapp.com/supply/packagings').map(res => res.json());
  }
  getPackaging(id) {
    return this.http.get(`http://hackathon-api-biagri.herokuapp.com/supply/packagings/${id}`).map(res => res.json());
  }

  // Team Members

  getTeamMembersList() {
    return this.http.get('http://hackathon-api-biagri.herokuapp.com/team-members').map(res => res.json());
  }
  getTeamMember(id) {
    return this.http.get(`http://hackathon-api-biagri.herokuapp.com/team-members/${id}`).map(res => res.json());
  }

}

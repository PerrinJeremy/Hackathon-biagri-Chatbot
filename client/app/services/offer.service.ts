import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class OfferService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getOfferList(cereal) {
    return this.http.get(`http://hackathon-api-biagri.herokuapp.com/collection/offers?product=${cereal}`).map(res => res.json());
  }
}

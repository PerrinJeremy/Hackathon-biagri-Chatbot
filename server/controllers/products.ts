import Product from '../models/product';
import BaseCtrl from './base';

export default class ProductCtrl extends BaseCtrl {
  model = Product;

  get = (req, res) => {
    this.model.findOne({ _id: req.params.id }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item.description);
    });
  }
}

import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import axios from 'axios';

import setRoutes from './routes';

const app = express();
/* dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public'))); */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/ble', async (req, res) => {
  let itemID;
  let offres = '';
  axios.get('http://hackathon-api-biagri.herokuapp.com/collection/products').then(result => {
    for (let item of result.data.products) {
      if (req.body.result.resolvedQuery == item.name || req.body.result.resolvedQuery == item.abbreviation) {
        this.itemID = item.id;
      }
    }
    console.log(this.itemID);
    axios.get('http://hackathon-api-biagri.herokuapp.com/collection/offers?product=' + this.itemID).then(toto => {
      this.offres = '';
      for (let tata of toto.data.offers) {
        this.offres += tata.price + '€ / T du: ' + tata.beginPeriod + ' au: ' + tata.endPeriod + '\n';
      }
      const speech = `Voici les offres concernant ${req.body.result.resolvedQuery} sont : ${this.offres}`;
      //const speech = `Le ${req.body.result.resolvedQuery} est : ${toto.data.description}`;
      res.json({
        speech: speech,
        displayText: speech,
        source: 'webhook-sample'
      });
    });
  });
});

let mongodbURI;
if (process.env.NODE_ENV === 'test') {
  mongodbURI = process.env.MONGODB_TEST_URI;
} else {
  mongodbURI = process.env.MONGODB_URI;
  app.use(morgan('dev'));
}

mongoose.Promise = global.Promise;
const mongodb = mongoose.connect(mongodbURI, { useMongoClient: true });

mongodb
  .then((db) => {
    console.log('Connected to MongoDB on', db.host + ':' + db.port);

    setRoutes(app);

    app.get('/*', function (req, res) {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    if (!module.parent) {
      app.listen(app.get('port'), () => {
        console.log('Angular Full Stack listening on port ' + app.get('port'));
      });
    }

  })
  .catch((err) => {
    console.error(err);
  });

export { app };

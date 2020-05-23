// SERVER
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, '/../client/dist')));

app.use(compression());

// DATABASE
//const db = require('../db/database.js');
const db = require('../db/database_pg.js');

// ROUTES
app.get('/listing/:productNumber', (req, res) => {
  res.sendFile('index.html', {
    root: path.join(__dirname, '/../client/dist/'),
  });
});

app.get('/products/:productNumber', (req, res) => {
  const { productNumber } = req.params;
  db.fetch(productNumber, (error, results) => {
    if (error) {
      res.status(404).send();
    } else {
      res.send(results);
    }
  });
});





// CRUD methods
app.post('/create-product', (req, res) => {
  console.log('at server post')
  db.create(req.body, (error, results) => {
    if (error) {
      res.status(404).send();
    } else {
      res.status(200).send(results);
    }
  });
});

// read an item
app.get('/read-product/:productId', (req, res) => {
  db.read(req.params.productId, (error, results) => {
    if (error) {
      res.status(404).send();
    } else {
      res.status(200).send(results);
    }
  });
});

// update an item
app.put('/update-product/:productId', (req, res) => {
  db.update(req.params.productId, req.body, (error, results) => {
    if (error) {
      res.status(404).send();
    } else {
      res.status(200).send(results);
    }
  });
});

// delete an item
app.delete('/delete-product/:productId', (req, res) => {
  db.deleteId(req.params.productId, (error, results) => {
    if (error) {
      res.status(404).send();
    } else {
      res.status(200).send(results);
    }
  });
});

module.exports = app;
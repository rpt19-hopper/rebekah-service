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

const port = process.env.PORT || 9000;

app.listen(port);

// DATABASE
const db = require('../db/database.js');

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
      res.sendStatus(404).send();
    } else {
      res.send(results);
    }
  });
});

console.log(process.env.NODE_ENV)
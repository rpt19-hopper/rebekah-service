// SERVER
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/../client/dist'));

let port = process.env.PORT || 9000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

// DATABASE
const db = require('../db/database.js');


// ROUTES
app.post('/products/:productNumber', function(req, res) {
  // Placeholder in case products will be able to be added for future use
})
app.get('/products/:productNumber', function(req, res) {
  var productNumber = req.params.productNumber;
  db.fetch(productNumber, function(results) {
    res.send(results)
  })
})
app.get('/products/:productNumber/name', function(req, res) {

})
app.get('/products/:productNumber/description', function(req, res) {
  // Placeholder in case description will be used for image servce as alt text for future use
})
app.get('/products/:productNumber/metadata', function(req, res) {
  // Placeholder in case metadata will be used to sort similar products for future use
})



const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/fec', {useNewUrlParser: true, useUnifiedTopology: true });
const fs = require('fs');

var ProductSchema = new Schema ({
  productNumber: { type: Number, required: true },
  productName: String,
  productDescription: String,
  productCategory: String,
  versions: {},
  storeNumber: Number
})

var ProductModel = mongoose.model('products', ProductSchema);

var data = JSON.parse(fs.readFileSync(__dirname + '/sample_products.json', 'utf8'))

// Drop collection
mongoose.connection.collections['products'].drop();

ProductModel.insertMany(data, function(error, docs) {
  if (error) {
    console.log('Error seeding database');
  } else {
    console.log('Successfully seeded database');
  }
})


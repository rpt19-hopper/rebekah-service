// MONGOOSE
const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.connect('mongodb://localhost:27017/fec', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('connected to mongo'))
.catch(error => console.log(error))

const ProductSchema = new Schema({
  productNumber: { type: Number, required: true },
  productName: String,
  productDescription: String,
  productCategory: String,
  versions: {},
  storeNumber: Number
});

const ProductModel = mongoose.model('products', ProductSchema);

const fetch = (productNumber, callback) => {
  ProductModel.findOne({ productNumber }, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

const create = (data, callback) => {
  ProductModel.create(data, function (err, results) {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

const read = (productNumber, callback) => {
  ProductModel.findOne({ productNumber }, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
}

const update = (productNumber, data, callback) => {
  ProductModel.updateOne({ productNumber }, data, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
}

const deleteId = (productNumber, callback) => {
  ProductModel.deleteOne({ productNumber }, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
}

module.exports = { 
  fetch,
  create,
  read,
  update,
  deleteId
};


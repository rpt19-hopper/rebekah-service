const { Client } = require('pg');


const client = new Client({
  user: 'student',
  host: '3.21.236.235',
  database: 'sdc',
  password: 'student',
  port: 5432,
});

client 
  .connect()
  .then(() => console.log('Connected to Postgres DB'))
  .catch(err => console.log('Postgres connection error', err))


const fetch = (productNumber, callback) => {
  var query = `SELECT * FROM products JOIN styles ON products.productNumber = styles.product_id WHERE productNumber = ${productNumber};`;
  client.query(query)
    .then((results) => {
      var data = results.rows[0];
      var styles = results.rows.map((item) => {
        return {name: item.style}
      })
      data.versions = { style: styles }
      callback(null, data)
    })
    .catch((err) => {
      console.log('fetch err',err)
      callback(err);
    })
};

const create = (data, callback) => {
  var query = `INSERT INTO products(productNumber, productName, productDescription, productCategory, storeNumber) VALUES (${data.productNumber}, '${data.productName}', '${data.productDescription}', '${data.productCategory}',${data.storeNumber});`;
  client.query(query)
    .then((results) => {
      callback(null, results)
    })
    .catch((err) => {
      callback(err);
    })
};

const read = (productNumber, callback) => {
  var query = `SELECT * FROM products JOIN styles ON products.productNumber = styles.product_id WHERE productNumber = ${productNumber};`;
  client.query(query)
    .then((results) => {
      var data = results.rows[0];
      var styles = results.rows.map((item) => {
        return {name: item.style}
      })
      data.versions = { style: styles }
      callback(null, data)
    })
    .catch((err) => {
      callback(err);
    })
}

const update = (productNumber, data, callback) => {
  var keys = Object.entries(data).map((item) => `${item[0]} = '${item[1]}'`).join(', ');
  var query = `UPDATE products SET ${keys} WHERE productNumber = ${productNumber};`;
  client.query(query)
    .then((results) => {
      callback(null, results)
    })
    .catch((err) => {
      callback(err);
    })
}

const deleteId = (productNumber, callback) => {
  var query = `DELETE FROM products WHERE productNumber = ${productNumber};`;
  client.query(query)
    .then((results) => {
      callback(null, results)
    })
    .catch((err) => {
      callback(err);
    })
}

module.exports = { 
  fetch,
  create,
  read,
  update,
  deleteId
};
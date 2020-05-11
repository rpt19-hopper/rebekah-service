const { Client } = require('pg');

const client = new Client({
  user: 'student',
  host: 'localhost',
  database: 'sdc',
  password: 'student',
  port: 5432,
});


var createProducts = 'CREATE TABLE IF NOT EXISTS products (' +
  'productNumber integer PRIMARY KEY NOT NULL,' +
  'productName varchar (200),' +
  'productDescription text,' +
  'productCategory varchar (200),' +
  'storeNumber integer)';
var copyToProducts = "COPY products FROM '/home/rebbyv/Projects/rpt19-sdc/rebekah-service/sample_data/postgres/pg_data_products.csv' CSV HEADER";


var createStyles = 'CREATE TABLE IF NOT EXISTS styles (' +
  'id integer PRIMARY KEY NOT NULL,' +
  'style varchar (200),' +
  'product_id integer,' +
  'FOREIGN KEY (product_id) REFERENCES products (productNumber))';
var copyToStyles = "COPY styles FROM '/home/rebbyv/Projects/rpt19-sdc/rebekah-service/sample_data/postgres/pg_data_styles.csv' CSV HEADER";


client 
  .connect()
  .then(() => {
    console.log('connected');
    client.query(createProducts)
    .then(() => {
      client.query(copyToProducts)
        .then((results) => {
          console.log(`${results.rowCount} rows inserted.`)
        })
        . catch(err => console.log('products copy error' ,err))
      })
      .catch(err => console.log('products table creation error', err))
    })
  .then(() => {
    client.query(createStyles)
    .then(() => {
      client.query(copyToStyles)
      .then((results) => {
        console.log(`${results.rowCount} rows inserted.`)
        client.end();
      })
      .catch(err => console.log('styles copy error' ,err))
    })
    .catch(err => console.log('styles table creation error', err))
  })
  .catch(err => console.log('connection error', err))
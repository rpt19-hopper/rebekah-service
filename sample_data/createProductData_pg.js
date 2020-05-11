const faker = require('faker');
const fs = require('fs')
const path = require('path')

console.time('write 10M')
const writeProducts = fs.createWriteStream('./sample_data/postgres_data/pg_data_products.csv');
writeProducts.write('productNumber,productName,productDescription,productCategory,storeNumber\n', 'utf8')

var writeTenMproducts = (writer, encoding, cb) => {
  let i = 0;
  function write() {
    let ok = true;
    do {
      i++;
      let name = faker.lorem.words();
      let description = faker.lorem.sentences(14);
      let category = faker.lorem.word();
      let store = Math.floor(Math.random() * 100000);
      let data = `${i},${name},${description},${category},${store}\n`;
      if (i === 10000000) {
        writer.write(data, encoding, cb); // Last time!
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        if (i % 1000000 === 0) {
          console.timeLog('write 10M')
        }
        ok = writer.write(data, encoding);
      }
    } while (i <= 10000000 && ok);
    if (i < 10000000) {
      // Had to stop early! Write some more once it drains.
      writer.once('drain', write);
    }
  }
  write();
}

writeTenMproducts(writeProducts, 'utf-8', () => {
  writeProducts.end();
  console.timeLog('write 10M')
})
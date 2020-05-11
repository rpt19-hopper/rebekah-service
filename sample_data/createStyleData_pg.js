const faker = require('faker');
const fs = require('fs')

console.time('write styles')
const writeStylesStream = fs.createWriteStream('./sample_data/postgres_data/pg_data_styles.csv');
writeStylesStream.write('id,style,product_id\n', 'utf8')

var writeStyles = (writer, encoding, cb) => {
  let i = 0;
  let x = 1;
  function write() {
    let ok = true;
    do {
      i++;
      let numStyles = Math.floor(Math.random() * 2 + 2);
      let data = '';
      for (let a = 0; a < numStyles; a++) {
        let name = faker.lorem.word();
        data += `${x},${name},${i}\n`;
        x++;
      }
      if (i === 10000000) {
        writer.write(data, encoding, cb); // Last time!
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        if (i % 1000000 === 0) {
          console.timeLog('write styles')
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

writeStyles(writeStylesStream, 'utf-8', () => {
  writeStylesStream.end();
  console.timeLog('write styles')
})
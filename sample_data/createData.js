const faker = require('faker');
const fs = require('fs')
const path = require('path')
const { writeToPath } = require('@fast-csv/format');


//for (let x = 0; x < 100; x++) {
  var data = [];
  
  for (let i = 1; i < 10; i++) {
    data.push(
      {
      productNumber: i,
      productName: faker.random.words(Math.floor(Math.random() * 5 + 1)),
      productDescription: faker.lorem.paragraphs(),
      productCategory: faker.random.words(1),
      versions: {
        style: [
          {
            name: faker.random.words(Math.floor(Math.random() * 2 + 1)),
            metaData: faker.random.words(Math.floor(Math.random() * 6 + 1)).split(' ')
          },
          {
            name: faker.random.words(Math.floor(Math.random() * 2 + 1)),
            metaData: faker.random.words(Math.floor(Math.random() * 6 + 1)).split(' ')
          }
        ]
      },
      storeNumber: Math.floor(Math.random() * 100000)
      }
    )
  }

  //console.log(data)

  writeToPath(path.resolve(__dirname, 'data.csv'), data, { headers: true })
  .on('error', err => console.error(err))
  .on('finish', () => console.log('Done writing.'));
//}

// fs.writeFile(__dirname + './newData.csv', data, (err) => {
//   if (err) throw err;
//   console.log('The file has been saved!');
// });
const faker = require('faker');
const fs = require('fs')
const path = require('path')

console.time('seed timer')

for (let x = 6; x <= 100; x++) {
  var data = [];
  for (let i = (((x - 1) * 100000) + 1); i <= (x * 100000); i++) {
    data.push(
      {
      productNumber: i,
      productName: faker.random.words(Math.floor(Math.random() * 4 + 1)),
      productDescription: faker.lorem.paragraphs(),
      productCategory: faker.random.words(1),
      versions: {
        style: [
          {
            name: faker.random.words(1),
          },
          {
            name: faker.random.words(1),
          }
        ]
      },
      storeNumber: Math.floor(Math.random() * 100000)
      }
    )
  }

  fs.writeFileSync(path.resolve(__dirname + '/mongo_data/' + `dataSet${x}.json`), JSON.stringify(data))
  console.log(`file #${x} written`)
  console.timeLog('seed timer')

}

/*
once the data generation is completed:
- open the terminal
- cd to sample_data/mongo_data
- run the following script:
  ls -1 *.json | while read jsonfile; do mongoimport -d fec -c products --file $jsonfile --jsonArray --type json; done
*/
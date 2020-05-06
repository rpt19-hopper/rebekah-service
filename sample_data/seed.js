const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fs = require('fs');
const faker = require('faker')

var options = {
  //server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 300000 } },
  //connectTimeoutMS: 300000,
  useNewUrlParser: true, 
  useUnifiedTopology: true 
};
mongoose.connect('mongodb://localhost:27017/fec', options);

var ProductSchema = new Schema ({
  productNumber: { type: Number, required: true },
  productName: String,
  productDescription: String,
  productCategory: String,
  versions: {},
  storeNumber: Number
})

var ProductModel = mongoose.model('products', ProductSchema);

//var data = JSON.parse(fs.readFileSync(__dirname + '/sample_products.json', 'utf8'))
var data = fs.readFileSync(__dirname + 'data.csv')

// Drop collection
mongoose.connection.collections['products'].drop();

//console.time('seed timer')
// for (let x = 0; x < 0000; x+=20000) {
//   var data = [];
  
//   for (let i = x + 1; i <= x + 20000; i++) {
//     data.push(
//       {
//       productNumber: i,
//       productName: faker.random.words(Math.floor(Math.random() * 5 + 1)),
//       productDescription: faker.lorem.paragraphs(),
//       productCategory: faker.random.words(1),
//       versions: {
//         style: [
//           {
//             name: faker.random.words(Math.floor(Math.random() * 2 + 1)),
//             metaData: faker.random.words(Math.floor(Math.random() * 6 + 1)).split(' ')
//           },
//           {
//             name: faker.random.words(Math.floor(Math.random() * 2 + 1)),
//             metaData: faker.random.words(Math.floor(Math.random() * 6 + 1)).split(' ')
//           }
//         ]
//       },
//       storeNumber: Math.floor(Math.random() * 100000)
//       }
//     )
//   }

  // async function seedDB() {
  //   try {
  //     await ProductModel.insertMany(data);
  //     console.log('seeded')
  //     console.timeLog('seed timer')
  //   } catch(e) {
  //     console.log({ err: e.errmsg, result: e.result.result.writeErrors });
  //   }
  // }
  // seedDB();

  ProductModel.insertMany(data, function(error) {
    if (error) {
      console.log('Error seeding database');
    } else {
      console.log('Successfully seeded database');
    }
  })

//}
//console.timeEnd('seed timer')
//mongoose.connection.close();

# Etsy Product Info API
API for creating, reading, updating, and deleting product info for Etsy products.


## Table of Contents

1. Create- POST(#Create)
1. Read- GET(#Read)
1. Update- PUT(#Update)
1. Delete- DELETE(#Delete)

## Create

### POST request to `/create-product`

Send a JSON file with all of the product information in the body of the request. A 'productNumber' is required.

Returns of a copy of the product inserted into the database along with the database ID as a JSON object.
```
{
  "_id": "5eadebdfc3d6b7173974ecf9",
  "productNumber": 65178,
  "productName": "Awesome Frozen Pants",
  "productDescription": "Proident mollit dolore Lorem labore sit non anim fugiat exercitation nulla occaecat nisi. Consectetur officia labore consectetur veniam tempor elit laboris ullamco eu elit est duis. Ut cupidatat pariatur adipisicing cillum pariatur pariatur eiusmod aliquip anim adipisicing proident. Non esse nisi id occaecat id aute in deserunt est. Sunt magna nisi laboris duis culpa irure deserunt culpa nisi fugiat fugiat do do.\nCupidatat dolor enim quis incididunt consectetur laborum do sint consectetur irure excepteur ipsum nisi cupidatat. Dolore ea Lorem occaecat officia veniam mollit consectetur magna incididunt cillum. Eu cillum cillum minim id veniam occaecat ipsum consectetur do nostrud labore pariatur irure commodo. Labore ex nisi commodo ipsum proident do irure occaecat. Sunt ut nostrud excepteur id est ea consequat exercitation velit elit tempor elit.",
  "productCategory": "Home",
  "versions": {
      "style": [
          {
              "name": "Fantastic",
              "metaData": [
                  "Refined",
                  "Ergonomic",
                  "Generic",
                  "Small"
              ]
          },
          {
              "name": "Intelligent",
              "metaData": [
                  "Fantastic"
              ]
          },
          {
              "name": "Gorgeous",
              "metaData": [
                  "Sleek",
                  "Licensed",
                  "Sleek",
                  "Intelligent",
                  "Handcrafted",
                  "Tasty"
              ]
          },
          {
              "name": "Licensed",
              "metaData": [
                  "Unbranded",
                  "Rustic",
                  "Small",
                  "Refined",
                  "Awesome",
                  "Sleek",
                  "Sleek",
                  "Unbranded",
                  "Refined",
                  "Practical"
              ]
          }
      ]
  },
  "storeNumber": 93,
  "__v": 0
}
```


## Read

### GET request to `/read-product/:productID`

A 'productNumber' is required.

Returns all the database information of the requested product as a JSON object.
```
{
  "_id": "5eadc60848c0176ca6d5af25",
  "productNumber": 60159,
  "productName": "Handcrafted Plastic Towels",
  "productDescription": "Qui magna occaecat aliqua culpa in proident laborum. Adipisicing cupidatat anim amet cillum sit consequat qui laborum aute officia esse et duis. Lorem fugiat ut deserunt deserunt occaecat id occaecat aute cupidatat magna tempor. Deserunt commodo deserunt eu. Lorem culpa id ullamco sint excepteur qui nostrud aliquip eiusmod mollit aute cillum.\nDeserunt excepteur officia qui et dolore minim proident est amet aute sunt ad ipsum nisi. Duis consequat ex eu in minim qui fugiat et nisi ullamco duis mollit nulla deserunt labore.",
  "productCategory": "Music",
  "versions": {
      "style": [
          {
              "name": "Small",
              "metaData": [
                  "Licensed"
              ]
          },
          {
              "name": "Unbranded",
              "metaData": [
                  "Practical",
                  "Small",
                  "Awesome",
                  "Incredible",
                  "Sleek",
                  "Generic",
                  "Incredible"
              ]
          },
          {
              "name": "Small",
              "metaData": [
                  "Incredible",
                  "Rustic",
                  "Handcrafted",
                  "Practical"
              ]
          },
          {
              "name": "Tasty",
              "metaData": [
                  "Small"
              ]
          },
          {
              "name": "Incredible",
              "metaData": [
                  "Rustic",
                  "Handmade",
                  "Intelligent",
                  "Ergonomic",
                  "Handcrafted",
                  "Practical",
                  "Licensed"
              ]
          }
      ]
  },
  "storeNumber": 27,
  "__v": 0
}
```


## Update

### PUT request to `/update-product/:productID`

A 'productNumber' is required. Also send of JSON file with the information to be updated in the database. Columns to update include: 'productName', 'productDescription', 'productCategory', versions, or 'storeNumber'.

Returns a JSON object to confirm the update:
```
{
  n: 1,
  nModified: 1,
  ok: 1
}
```


## Delete

### DELETE request to `/delete-product/:productID`

A 'productNumber' is required. 

Returns a JSON object to confirm the deletion:
```
{
  n: 1,
  deletedCount: 1,
  ok: 1
}
```

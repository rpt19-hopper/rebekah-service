/**
 * @jest-environment node
 */

import { mockData } from './sample/sample_test.js'

const app = require('../server/app.js');
const request = require('supertest');

describe('Server products endpoint GET requests', () => {

  it('should return 200', async done => {
    const res = await request(app).get(`/products/${mockData.productNumber}`);
    expect(res.statusCode).toBe(200);
    done();
  });

  it('should return an empty object if product doesn\'t exist', async done => {
    const res = await request(app).get(`/products/123456789`);
    expect(res.body).toEqual({});
    done();
  });

  it('should return product object with model keys', async done => {
    const res = await request(app).get(`/products/${mockData.productNumber}`);
    expect(typeof res.body).toBe('object');
    expect(res.body).toHaveProperty('productNumber');
    expect(res.body).toHaveProperty('productName');
    expect(res.body).toHaveProperty('productDescription');
    expect(res.body).toHaveProperty('productCategory');
    expect(res.body).toHaveProperty('versions');
    done();
  });

  it('should return product object with correct key/value pairs', async done => {
    const res = await request(app).get(`/products/${mockData.productNumber}`);
    expect(res.body.productNumber).toEqual(mockData.productNumber);
    expect(res.body.productName).toEqual(mockData.productName);
    expect(res.body.productDescription).toEqual(mockData.productDescription);
    expect(res.body.productCategory).toEqual(mockData.productCategory);
    expect(res.body.versions).toEqual(mockData.versions);
    done();
  });

})

describe('Server listing endpoint GET requests', () => {

  it('should return 200', async done => {
    const res = await request(app).get(`/listing/${mockData.productNumber}`);
    expect(res.statusCode).toBe(200);
    done();
  })

})

describe('Server handles CRUD operations- CREATE', () => {

  it('responds with status code 404 for a create request where the product ID is not supplied', () => {
    request(app)
      .get('/create-product')
      .expect(404)
      .then(() => done());
  });

  it('responds with status code 200 and a product JSON object for a read request for a valid product', () => {
    var product = {
      productNumber: 1,
      productName: 'test name',
      productCategory: 'test category',
      productDescription: 'test description'
    };
    request(app)
      .post('/create-product')
      .send(product)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-type', /json/)
      .then((res) => {
        expect(res.body).to.exist;
        expect(res.body).to.have.property('_id');
        expect(res.body).to.be.an('object');
        done()
      });
  });
});

describe('Server handles CRUD operations- READ', () => {

  it('responds with status code 404 for a read request where the product ID does not exist', () => {
    request(app)
      .get('/read-product')
      .expect(404)
      .then(() => done());
  });

  it('responds with status code 200 and a product JSON object for a read request for a valid product', () => {
    request(app)
      .get('/read-product/549504785')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-type', /json/)
      .then((res) => {
        expect(res.body).to.exist;
        expect(res.body).to.have.property('productNumber');
        expect(res.body).to.have.property('productName');
        expect(res.body).to.have.property('productDescription');
        expect(res.body).to.have.property('productCategory');
        expect(res.body.versions).to.be.an('object');
        done()
      });
  });

});

describe('Server handles CRUD operations- UPDATE', () => {

  it('responds with status code 404 for a read request where the product ID does not exist', () => {
    request(app)
      .put('/update-product')
      .expect(404)
      .then(() => done());
  });

  it('responds with status code 200 and a product JSON object for a read request for a valid product', () => {
    var newName = { productName: 'new test name' };
    request(app)
      .put('/update-product/1')
      .set('Accept', 'application/json')
      .send(newName)
      .expect(200)
      .expect('Content-type', /json/)
      .then((res) => {
        console.log(req.body)
        expect(res.body).to.exist;
        done()
      });
  });

});

describe('Server handles CRUD operations- DELETE', () => {

  it('responds with status code 404 for a read request where the product ID does not exist', () => {
    request(app)
      .get('/delete-product')
      .expect(404)
      .then(() => done());
  });

  it('responds with status code 200 and a product JSON object for a read request for a valid product', () => {
    request(app)
      .delete('/delete-product/1')
      .expect(200)
      .expect('Content-type', /json/)
      .then((res) => {
        expect(res.body).to.exist;
        expect(res.body.versions).to.be.an('object');
        done()
      });
  });

});

 
const supertest = require('supertest');
// import app from './index';
// const app = require("./index");
const app = require('../index');
// const { createProduct } = require("../queries/products");

describe('products', () => {
  describe('GET product route', () => {
    describe('given the product does not exist', () => {
      it('should return a 404 status', async () => {
        const productId = 0;
        await supertest(app).get(`/api/products/${productId}')`).expect(404);
      });
    });
    describe('product with id 1 exists and should match', () => {
      it('should return a 200 status and the product should match product 1', async () => {
        const product = {
          id: 1,
          name: 'Keenstone 2 Slice Toaster Retro Stainless Steel Toaster',
          description: 'Green Toaster',
          image_link: 'toaster',
        };

        const { body, statusCode } = await supertest(app).get(
          `/api/products/${product.id}`
        );
        // expect(body[0].id).toBe(product.id);

        expect(statusCode).toBe(200)
        expect(body[0]).toEqual({
          id: product.id,
          name: product.name,
          description: product.description,
          stock: expect.any(Number),
          image_link: product.image_link,
          discount: expect.any(Number),
          price: expect.any(Number),
        });
      });
    });
    describe('random product exists', () => {
      it('should return a 200 status and the product schema should be correct', async () => {
        const randomId = Math.random() * 18;
        const { body, statusCode } = await supertest(app).get(
          `/api/products/${randomId}`
        );
        expect(statusCode).toBe(200)
        expect(body[0]).toEqual({
          id: expect.any(Number),
          name: expect.any(String),
          description: expect.any(String),
          stock: expect.any(Number),
          image_link: expect.any(String),
          discount: expect.any(Number),
          price: expect.any(Number),
        });
        
      });
    });
    describe('should be able to get product page', () => {
      it('should return the correct number of products from the page', async () => {
        const pageSize = 9;
        const { body, statusCode } = await supertest(app).get(
          `/api/products/page/1`
        );
        expect(body.length).toEqual(pageSize)
      });
    });
    describe('product page doesnt exist', () => {
      it('should return 404', async () => {
        const page = 3;
        await supertest(app).get(`/api/products/page/${page}`).expect(404);
      });
    });
    describe('discount products working', () => {
      it('should return 200 and discount products in order', async () => {
        const { body, statusCode } = await supertest(app).get(
          `/api/products/discounted/3`
        );
        expect(statusCode).toBe(200)
        expect(body[0].discount).toBeGreaterThanOrEqual(body[1].discount)
        expect(body[1].discount).toBeGreaterThanOrEqual(body[2].discount)
      });
    });

    describe('total number of products correct', () => {
      it('should return 200 and number of products should be correct', async () => {
        totalNumberOfProducts = 18;
        const { body, statusCode } = await supertest(app).get(
          `/api/products/total/get_number`
        );
        console.log(body)
        expect(statusCode).toBe(200)
        expect(Number(body)).toBe(totalNumberOfProducts)
      });
    });






    
  });
});

const supertest = require('supertest');
const app = require('../index');

describe('PRODUCTS', () => {
  describe('GET request for entire products table.', () => {
    it('Gets all Products (returns a 200 status).', async () => {
      const { body, statusCode } = await supertest(app).get(`/api/products/`);
      expect(statusCode).toBe(200);
    });
  });
  describe('GET request for single product by id.', () => {
    it('Product does not exist (returns a 404 status).', async () => {
      const productId = 0;
      await supertest(app).get(`/api/products/${productId}`).expect(404);
    });
    it('Product should match product 1 (returns a 200 status).', async () => {
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

      expect(statusCode).toBe(200);
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
    it('Gets random product and product schema is correct (returns a 200 status).', async () => {
      const randomId = Math.floor(Math.random() * 18);
      const { body, statusCode } = await supertest(app).get(
        `/api/products/${randomId}`
      );
      expect(statusCode).toBe(200);
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
  describe('GET request for getting a products page.', () => {
    it('Page exists (number of products returned should equal 9).', async () => {
      const pageSize = 9;
      const { body, statusCode } = await supertest(app).get(
        `/api/products/page/1`
      );
      expect(body.length).toEqual(pageSize);
    });
    it('Page does not exist (returns a 404 status)', async () => {
      const page = 50;
      await supertest(app).get(`/api/products/page/${page}`).expect(404);
    });
  });
  describe('GET request for getting discount products.', () => {
    it('gets the three most discounted products in order (returns a 200 status).', async () => {
      const { body, statusCode } = await supertest(app).get(
        `/api/products/discounted/3`
      );
      expect(statusCode).toBe(200);
      expect(body[0].discount).toBeGreaterThanOrEqual(body[1].discount);
      expect(body[1].discount).toBeGreaterThanOrEqual(body[2].discount);
    });
  });
  describe('GET request for counting the total number of products.', () => {
    it('Counts the correct number of products (returns the number of products and a 200 status).', async () => {
      const { body, statusCode } = await supertest(app).get(
        `/api/products/total/get_number`
      );
      expect(Number(body)).toBe(18);
      expect(statusCode).toEqual(200);
    });
  });
  describe('POST request for searching products.', () => {
    it('Should return empty array if nothing is found (returns status 200).', async () => {
      const testSearchPayload = {
        search: 'asdasgfad213',
      };
      const resultArrayToExpect = [];
      const { body, statusCode } = await supertest(app)
        .post(`/api/products/search_products/search`)
        .send(testSearchPayload);
      expect(statusCode).toBe(200);
      expect(body).toEqual(resultArrayToExpect);
    });
    it('Should return products when searched (returns status 200).', async () => {
      const testSearchPayload = {
        search: 'exercise',
      };
      const resultArrayToExpect = [
        {
          id: 9,
          name: 'YOSUDA Magnetic Resistance Exercise Bike',
          description: 'Exercise Bike',
          stock: 55,
          image_link: 'exercisebike',
          discount: 10,
          price: 375.99,
        },
        {
          id: 14,
          name: 'FLYBIRD Adjustable Weight Exercise Bench',
          description: 'Exercise Bench',
          stock: 77,
          image_link: 'workoutbench',
          discount: 60,
          price: 179.99,
        }
      ];

      const { body, statusCode } = await supertest(app)
        .post(`/api/products/search_products/search`)
        .send(testSearchPayload);

      expect(statusCode).toBe(200);
      expect(body).toEqual(resultArrayToExpect);
    });
  });
  let productId;
  describe('POST request for a creating a new product.', () => {
    it('Adds a new product to the table (returns status 200).', async () => {
      const testProductPayload = {
        name: 'produto de teste',
        price: 15,
        description: 'descriçao do produto',
        stock: 50,
        image_link: 'http://lasdaladas',
        discount: 35,
      };
      const { body, statusCode } = await supertest(app)
        .post(`/api/products`)
        .send(testProductPayload);

      expect(statusCode).toBe(201);
      productId = body;
    });
  });
  describe('PUT request for adding stock to a product.', () => {
    let originalStock;
    it('Gets original stock value.', async () => {
      const { body, statusCode } = await supertest(app).get(
        `/api/products/${productId}`
      );

      originalStock = body[0].stock;
      expect(statusCode).toBe(200);
    });
    it('Adds a quantity of 10 to product stock value.', async () => {
      const payload = {
        products_id: productId,
        quantity: 10,
      };
      const { statusCode: putStatusCode } = await supertest(app)
        .put(`/api/products/add_stock`)
        .send(payload);

      expect(putStatusCode).toBe(200);
    });
    it('Compares both (returns a 200 status).', async () => {
      const { body, statusCode } = await supertest(app).get(
        `/api/products/${productId}`
      );

      expect(body[0].stock).toBe(originalStock + 10);

      expect(statusCode).toBe(200);
    });
  });
  describe('PUT request for removing stock from a product.', () => {
    let originalStock;
    it('Gets original stock value.', async () => {
      const { body, statusCode } = await supertest(app).get(
        `/api/products/${productId}`
      );

      originalStock = body[0].stock;
      expect(statusCode).toBe(200);
    });

    it('Removes a quantity of 10 to product stock value.', async () => {
      const payload = {
        products_id: productId,
        quantity: 10,
      };
      const { body, statusCode } = await supertest(app)
        .put(`/api/products/`)
        .send(payload);
      expect(statusCode).toBe(200);
    });
    it('Compares both (returns a 200 status).', async () => {
      const { body, statusCode } = await supertest(app).get(
        `/api/products/${productId}`
      );

      expect(body[0].stock).toBe(originalStock - 10);

      expect(statusCode).toBe(200);
    });
  });
  describe('DELETE request for removing a product from the table.', () => {
    it('Deletes a product from the table (returns status 200).', async () => {
      const { body, statusCode } = await supertest(app).delete(
        `/api/products/${productId}`
      );
      expect(statusCode).toBe(200);
    });
  });
});

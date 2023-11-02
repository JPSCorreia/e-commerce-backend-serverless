const supertest = require('supertest');
const app = require('../src/app');
describe('ORDERS', () => {
  describe('GET request for single order by id.', () => {
    it('Order does not exist (returns a 404 status).', async () => {
      const orderId = 0;
      await supertest(app).get(`/api/orders/${orderId}`).expect(404);
    });
    it('Gets the correct order (returns a 200 status).', async () => {
      const orderId = 115;
      const resultArrayToExpect = [
        {
          id: 115,
          user_email: 'testing@test.com',
          status: 'Ordered',
          total: 240,
          created_timestamp: '2023-10-17T13:49:06.738Z',
          full_name: 'Test Tester',
          street_address: 'Avenida dos testes',
          city: 'Lisboa',
          postcode: '12345-789',
          phone_number: '123456789',
          country: 'Portugal',
        },
      ];
      const { body, statusCode } = await supertest(app).get(
        `/api/orders/${orderId}`
      );

      expect(statusCode).toBe(200);
      expect(body).toEqual(resultArrayToExpect);
    });
  });
  describe('GET request for all orders by username(email).', () => {
    it('Username does not exist (returns a 404 status).', async () => {
      const username = 'fake@test.com';
      await supertest(app).get(`/api/orders/get_all/${username}`).expect(404);
    });
    it('Gets the correct orders (returns a 200 status).', async () => {
      const username = 'testing@test.com';
      const resultArrayToExpect = [
        {
          id: 116,
          user_email: 'testing@test.com',
          status: 'Ordered',
          total: 399.955,
          created_timestamp: '2023-10-17T13:53:32.197Z',
          full_name: 'Test Tester',
          street_address: 'Avenida dos testes',
          city: 'Lisboa',
          postcode: '12345-789',
          phone_number: '123456789',
          country: 'Portugal',
        },
        {
          id: 115,
          user_email: 'testing@test.com',
          status: 'Ordered',
          total: 240,
          created_timestamp: '2023-10-17T13:49:06.738Z',
          full_name: 'Test Tester',
          street_address: 'Avenida dos testes',
          city: 'Lisboa',
          postcode: '12345-789',
          phone_number: '123456789',
          country: 'Portugal',
        },
      ];

      const { body, statusCode } = await supertest(app).get(
        `/api/orders/get_all/${username}`
      );

      expect(statusCode).toBe(200);
      expect(body).toEqual(resultArrayToExpect);
    });
  });
  describe('GET request for all items from one order.', () => {
    it('Order does not exist (returns a 404 status).', async () => {
      const orderId = 0;
      await supertest(app)
        .get(`/api/orders/order_products/${orderId}`)
        .expect(404);
    });
    it('Gets the correct items (returns a 200 status).', async () => {
      const orderId = 116;
      const resultArrayToExpect = [
        {
          description: 'Green Toaster',
          discount: 20,
          id: 25,
          image_link: 'toaster',
          name: 'Keenstone 2 Slice Toaster Retro Stainless Steel Toaster',
          order_id: 116,
          price: 50,
          products_id: 1,
          quantity: 2,
          stock: 133,
        },
        {
          description: 'Household Tool Kit',
          discount: 50,
          id: 27,
          image_link: 'toolkit',
          name: 'Prostormer General Home/Auto Repair Tool Set',
          order_id: 116,
          price: 79.97,
          products_id: 12,
          quantity: 3,
          stock: 102,
        },
      ];
      const { body, statusCode } = await supertest(app).get(
        `/api/orders/order_products/${orderId}`
      );

      expect(statusCode).toBe(200);
      expect(body).toEqual(resultArrayToExpect);
    });
  });
  describe('GET request for getting number of orders by username(email).', () => {
    xit('Username does not exist (returns a 404 status).', async () => {
      const username = 'fake@test.com';
      await supertest(app)
        .get(`/api/orders/get_number/${username}`)
        .expect(404);
    });
    it('Gets the correct number of orders (returns a 200 status).', async () => {
      const username = 'testing@test.com';
      const resultToExpect = 2;
      const { body, statusCode } = await supertest(app).get(
        `/api/orders/get_number/${username}`
      );
      expect(statusCode).toBe(200);
      expect(body).toEqual(resultToExpect);
    });
  });
  describe('GET request for getting date of orders by username(email).', () => {
    it('Username does not exist (returns a 404 status).', async () => {
      const username = 'fake@test.com';
      await supertest(app).get(`/api/orders/get_date/${username}`).expect(404);
    });
    it('Gets the correct number of orders (returns a 200 status).', async () => {
      const username = 'testing@test.com';
      const resultToExpect = { month: 'October', year: 2023 };
      const { body, statusCode } = await supertest(app).get(
        `/api/orders/get_date/${username}`
      );
      expect(statusCode).toBe(200);
      expect(body).toEqual(resultToExpect);
    });
  });
  let orderId;
  describe('POST request for a creating a new order.', () => {
    it('Adds a new order to the table (returns status 200).', async () => {
      const testOrderPayload = {
        user_email: 'testing@test.com',
        total: 400,
        status: 'Ordered',
        full_name: 'Test Tester',
        street_address: 'Avenida dos testes',
        city: 'Lisboa',
        postcode: '12345-789',
        phone_number: '123456789',
        country: 'Portugal',
      };
      const { body, statusCode } = await supertest(app)
        .post(`/api/orders`)
        .send(testOrderPayload);
      orderId = body;

      expect(statusCode).toBe(201);
    });
  });
  describe('PUT request for a changing order information.', () => {
    it('Order does not exist (returns a 404 status).', async () => {
      const orderId = 0;
      await supertest(app).put(`/api/orders/${orderId}`).expect(404);
    });
    it('Changes user, total and status (returns status 200).', async () => {
      const testOrderPayload = {
        user_email: 'testing@test.com',
        total: 1000,
        status: 'Ordered',
      };
      const { body, statusCode } = await supertest(app)
        .put(`/api/orders/${orderId}`)
        .send(testOrderPayload);

      expect(statusCode).toBe(200);
    });
  });
  describe('DELETE request for removing an order from the table.', () => {
    it('Order does not exist (returns a 404 status).', async () => {
      const orderId = 0;
      await supertest(app).delete(`/api/orders/${orderId}`).expect(404);
    });
    it('Deletes an order from the table (returns status 200).', async () => {
      const { body, statusCode } = await supertest(app).delete(
        `/api/orders/${orderId}`
      );
      expect(statusCode).toBe(200);
    });
  });
});

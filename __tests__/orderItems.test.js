const supertest = require('supertest');
const app = require('../index');
describe('ORDER ITEMS', () => {
  describe('GET request for all order items.', () => {
    it('Gets all the orders (returns a 200 status).', async () => {
      const { body, statusCode } = await supertest(app).get(`/api/order_items`);

      expect(statusCode).toBe(200);
    });
  })
  describe('GET request for single order item by id.', () => {
    it('Order item does not exist (returns a 204 status).', async () => {
      await supertest(app).get(`/api/cart_items/0`).expect(204);
    });
    it('Gets the correct order item (returns a 200 status).', async () => {
      const orderId = 28;
      const resultArrayToExpect = [
        {
          id: 28,
          products_id: 1,
          order_id: 115,
          quantity: 6,
          discount: 20
        },
      ];
      const { body, statusCode } = await supertest(app).get(
        `/api/order_items/${orderId}`
      );

      expect(statusCode).toBe(200);
      expect(body).toEqual(resultArrayToExpect);
    });
  });
  let orderItemId;
  describe('POST request for a creating a new order item.', () => {
    it('Adds a new order item to the table (returns status 200).', async () => {
      // const testOrderItemPayload2 = {
      //     products_id: 1,
      //     order_id: 115,
      //     quantity: 10,
      //     discount: 20
      // };
      const testOrderItemPayload = [[1,115,10,20]];

      const { body, statusCode } = await supertest(app)
        .post(`/api/order_items`)
        .send(testOrderItemPayload);
      orderItemId = body;

      expect(statusCode).toBe(201);
    });
  });
  describe('PUT request for a changing order item information.', () => {
    const testOrderItemPayload = {
        products_id: 2,
        order_id: 116,
        quantity: 50
    };
    it('Order item does not exist (returns a 404 status).', async () => {
      await supertest(app).put(`/api/order_items/0`).send(testOrderItemPayload).expect(404);
    });
    it('Changes products_id, order_id and quantity (returns status 200).', async () => {

      const { body, statusCode } = await supertest(app)
        .put(`/api/order_items/${orderItemId}`)
        .send(testOrderItemPayload);
      expect(statusCode).toBe(200);
    });
  });
  describe('DELETE request for removing an order item from the table.', () => {
    it('Order item does not exist (returns a 404 status).', async () => {
      await supertest(app).delete(`/api/order_items/0`).expect(404);
    });
    it('Deletes an order item from the table (returns status 200).', async () => {
      const { body, statusCode } = await supertest(app).delete(
        `/api/order_items/${orderItemId}`
      );
      expect(statusCode).toBe(200);
    });
  });
})
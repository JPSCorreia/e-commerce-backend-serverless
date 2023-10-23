const supertest = require('supertest');
const app = require('../index');
describe('CART ITEMS', () => {
  describe('GET request for all carts.', () => {
    it('Gets all the carts (returns a 200 status).', async () => {
      const { body, statusCode } = await supertest(app).get(`/api/cart_items`);

      expect(statusCode).toBe(200);
    });
  });
  describe('GET request for single cart by username(email).', () => {
    it('Cart does not exist (returns a 404 status).', async () => {
      const username = 'fake@test.com';
      await supertest(app).get(`/api/cart_items/${username}`).expect(404);
    });
    it('Gets the correct cart (returns a 200 status).', async () => {
      const username = 'testing@test.com';
      const resultArrayToExpect = [
        {
          id: 80,
          user_email: 'testing@test.com',
          products_id: 1,
          quantity: 2,
        },
      ];
      const { body, statusCode } = await supertest(app).get(
        `/api/cart_items/${username}`
      );

      expect(statusCode).toBe(200);
      expect(body).toEqual(resultArrayToExpect);
    });
  });
  describe('GET request for single cart item by username(email) and product id.', () => {
    it('Cart item does not exist (returns a 404 status).', async () => {
      const username = 'fake@test.com';
      const productId = 1;
      await supertest(app)
        .get(`/api/cart_items/get_cart/${username}/${productId}`)
        .expect(404);
    });
    it('Gets the correct cart item(returns a 200 status).', async () => {
      const username = 'testing@test.com';
      const productId = 1;
      const resultArrayToExpect = [
        {
          id: 80,
          user_email: 'testing@test.com',
          products_id: 1,
          quantity: 2,
        },
      ];
      const { body, statusCode } = await supertest(app).get(
        `/api/cart_items/get_cart/${username}/${productId}`
      );

      expect(statusCode).toBe(200);
      expect(body).toEqual(resultArrayToExpect);
    });
  });
  describe('GET request for cart total price by username(email) and product id.', () => {
    it('Username does not exist (returns a 404 status).', async () => {
      const username = 'fake@test.com';
      await supertest(app)
        .get(`/api/cart_items/total_price/${username}`)
        .expect(404);
    });
    it('Gets the correct price (returns a 200 status).', async () => {
      const username = 'testing@test.com';
      const totalPrice = 80;
      const { body, statusCode } = await supertest(app).get(
        `/api/cart_items/total_price/${username}`
      );
      expect(statusCode).toBe(200);
      expect(body[0].sum).toEqual(totalPrice);
    });
  });
  describe('GET request for all cart items by username(email).', () => {
    it('User does not exist (returns a 404 status).', async () => {
      const username = 'fake@test.com';
      await supertest(app)
        .get(`/api/cart_items/cart_products/${username}`)
        .expect(404);
    });
    it('Gets the correct cart (returns a 200 status).', async () => {
      const username = 'testing@test.com';
      const resultArrayToExpect = [
        {
          id: 1,
          name: 'Keenstone 2 Slice Toaster Retro Stainless Steel Toaster',
          price: 50,
          description: 'Green Toaster',
          quantity: 2,
          image_link: 'toaster',
          discount: 20,
        },
      ];
      const { body, statusCode } = await supertest(app).get(
        `/api/cart_items/cart_products/${username}`
      );

      expect(statusCode).toBe(200);
      expect(body).toEqual(resultArrayToExpect);
    });
  });
  describe('GET request for cart item total by username(email) and product id.', () => {
    it('Username does not exist (returns a 404 status).', async () => {
      const username = 'fake@test.com';
      await supertest(app)
        .get(`/api/cart_items/total_number/${username}`)
        .expect(404);
    });
    it('Gets the correct item number (returns a 200 status).', async () => {
      const username = 'testing@test.com';
      const totalQuantity = 2;
      const { body, statusCode } = await supertest(app).get(
        `/api/cart_items/total_number/${username}`
      );
      expect(statusCode).toBe(200);
      expect(Number(body[0].sum)).toEqual(totalQuantity);
    });
  });
  let cartItemId;
  let originalQuantity;
  describe('POST request for a creating a new cart item.', () => {
    it('Adds a new order to the table (returns status 200).', async () => {
      originalQuantity = 5;
      const testCartItemPayload = {
        products_id: 4,
        user_email: 'testing@test.com',
        quantity: originalQuantity,
      };
      const { body, statusCode } = await supertest(app)
        .post(`/api/cart_items`)
        .send(testCartItemPayload);
      cartItemId = body;

      expect(statusCode).toBe(201);
    });
  });
  describe('PUT request for adding quantity to a cart item.', () => {
    it('Adds a quantity of 10 to cart item quantity.', async () => {
      const payload = {
        user_email: 'testing@test.com',
        products_id: 4,
        quantity: 10,
      };
      const { statusCode: putStatusCode } = await supertest(app)
        .put(`/api/cart_items`)
        .send(payload);

      expect(putStatusCode).toBe(200);
    });
    it('Removes a quantity of 5 to cart item quantity.', async () => {
      const payload = {
        user_email: 'testing@test.com',
        products_id: 4,
        quantity: 5,
      };
      const { statusCode: putStatusCode } = await supertest(app)
        .put(`/api/cart_items/remove_quantity`)
        .send(payload);

      expect(putStatusCode).toBe(200);
    });
    it('Compares both (returns a 200 status).', async () => {
      const username = 'testing@test.com';
      const { body, statusCode } = await supertest(app).get(
        `/api/cart_items/get_cart/${username}/4`
      );
      expect(body[0].quantity).toBe(originalQuantity + 5);
      expect(statusCode).toBe(200);
    });
  });
  describe('DELETE request for removing a cart item from the table.', () => {
    it('Cart item does not exist (returns a 404 status).', async () => {
      await supertest(app).delete(`/api/cart_items/delete_item/testing@test.com/0`).expect(404);
    });
    it('Deletes a cart item from the table (returns status 200).', async () => {
      const { body, statusCode } = await supertest(app).delete(
        `/api/cart_items/delete_item/testing@test.com/4`
      );
      expect(statusCode).toBe(200);
    });
  });
});

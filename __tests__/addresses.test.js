const supertest = require('supertest');
const app = require('../index');
describe('ADDRESSES', () => {
  describe('GET request for single address by username(email).', () => {
    it('Address does not exist (returns a 404 status).', async () => {
      const username = 'fake@test.com';
      await supertest(app).get(`/api/addresses/${username}`).expect(404);
    });
    it('Gets the correct address (returns a 200 status).', async () => {
      const username = 'testing@test.com';
      const resultArrayToExpect = [
        {
          id: 61,
          user_email: 'testing@test.com',
          full_name: 'Test Tester',
          street_address: 'Av. da Liberdade',
          city: 'Lisboa',
          postcode: '12345-789',
          phone_number: '123456789',
          country: 'Portugal',
        },
      ];
      const { body, statusCode } = await supertest(app).get(
        `/api/addresses/${username}`
      );

      expect(statusCode).toBe(200);
      expect(body).toEqual(resultArrayToExpect);
    });
  });
  let addressId;
  describe('POST request for a creating a new address.', () => {
    it('Adds a new address to the table (returns status 200).', async () => {
      const testAddressPayload = {
        data: {
          user_email: 'testing@test.com',
          full_name: 'Test Tester',
          street_address: 'Av. da Liberdade 2',
          city: 'Lisboa',
          postcode: '12345-789',
          phone_number: '123456789',
          country: 'Portugal',
        },
      };
      const { body, statusCode } = await supertest(app)
        .post(`/api/addresses`)
        .send(testAddressPayload);
      addressId = body;
      console.log(body);
      console.log(addressId);

      expect(statusCode).toBe(201);
    });
  });
  describe('PUT request for a changing address information.', () => {
    const testAddressPayload = {
      data: {
        full_name: 'Test Tester 3',
        street_address: 'Av. da Liberdade 3',
        city: 'Lisboa',
        postcode: '12345-789',
        phone_number: '123456789',
        country: 'Portugal'
      }
    };
    it('Address does not exist (returns a 404 status).', async () => {
      await supertest(app).put(`/api/addresses/0`).send(testAddressPayload).expect(404);
    });
    it('Changes name, street address, city, postcode, phone and country (returns status 200).', async () => {

      const { body, statusCode } = await supertest(app)
        .put(`/api/addresses/${addressId}`)
        .send(testAddressPayload);
      expect(statusCode).toBe(200);
    });
  });
  describe('DELETE request for removing an address from the table.', () => {
    it('Address does not exist (returns a 404 status).', async () => {
      await supertest(app).delete(`/api/addresses/0`).expect(404);
    });
    it('Deletes an address from the table (returns status 200).', async () => {
      const { body, statusCode } = await supertest(app).delete(
        `/api/addresses/${addressId}`
      );
      expect(statusCode).toBe(200);
    });
  });
});

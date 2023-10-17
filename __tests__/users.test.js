const supertest = require('supertest');
const app = require('../index');
describe('USERS', () => {
  describe('GET request for single user by username(email).', () => {
    it('User does not exist (returns a 404 status).', async () => {
      const username = 'wkedqwke21390kad@aksdadka.com';
      await supertest(app).get(`/api/users/${username}`).expect(404);
    });
    it('User should match (returns a 200 status).', async () => {
      const username = 'john@gmail.com';
      const resultArrayToExpect = [
        {
          id: 15,
          email: 'john@gmail.com',
          admin: false,
          image_link: 'a',
          created_timestamp: '2022-06-14T09:03:11.484Z',
        },
      ];
      const { body, statusCode } = await supertest(app).get(
        `/api/users/${username}`
      );
      expect(body).toEqual(resultArrayToExpect);
      expect(statusCode).toBe(200);
    });
  });
  describe('GET request for retrieving month and year of registration by username(email).', () => {
    it('User does not exist (returns a 404 status).', async () => {
      const username = 'wkedqwke21390kad@aksdadka.com';
      await supertest(app).get(`/api/users/get_date/${username}`).expect(404);
    });
    it('Month and year should match (returns a 200 status).', async () => {
      const username = 'john@gmail.com';
      const resultToExpect = {
        month: 'June',
        year: 2022,
      };
      const { body, statusCode } = await supertest(app).get(
        `/api/users/get_date/${username}`
      );
      expect(body).toEqual(resultToExpect);
      expect(statusCode).toBe(200);
    });
  });
  let userId;
  describe('POST request for a creating a new user.', () => {
    it('Adds a new user to the table (returns status 200).', async () => {
      const testUserPayload = {
        email: 'test_user@testing.com',
        admin: false,
        image_link: 'http://lasdaladas',
      };
      const { body, statusCode } = await supertest(app)
        .post(`/api/users`)
        .send(testUserPayload);

      expect(statusCode).toBe(201);
      userId = body;
    });
  });
  describe('PUT request for a changing user information.', () => {
    it('Changes every field (returns status 200).', async () => {
      const testUserPayload = {
        email: 'testing_put@testingput.com',
        admin: true,
        image_link: 'http://testingput.com',
      };
      const { body, statusCode } = await supertest(app)
        .put(`/api/users/${userId}`)
        .send(testUserPayload);

      expect(statusCode).toBe(200);
    });
  });
  describe('DELETE request for removing a user from the table.', () => {
    it('Deletes a user from the table (returns status 200).', async () => {
      const { body, statusCode } = await supertest(app).delete(
        `/api/users/${userId}`
      );
      expect(statusCode).toBe(200);
    });
  });
});

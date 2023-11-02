const supertest = require('supertest');
const app = require('../src/app');
describe('REVIEWS', () => {
  describe('GET request for single review by id.', () => {
    it('Product review does not exist (returns a 204 status).', async () => {
      await supertest(app).get(`/api/reviews/0`).expect(204);
    });
    it('Gets the correct review (returns a 200 status).', async () => {
      const reviewProductId = 7;

      const resultArrayToExpect = [
        {
          comment: 'Great storage capacity!',
          full_name: 'Testing',
          id: 115,
          image_link:
            'https://s.gravatar.com/avatar/ead4b9ffae92166bd7f5b4a4eff407e2?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fde.png',
          products_id: 7,
          rating: 5,
          user_email: 'testing@test.com',
        }
      ];
      const { body, statusCode } = await supertest(app).get(
        `/api/reviews/${reviewProductId}`
      );

      expect(statusCode).toBe(200);
      expect(body).toEqual(resultArrayToExpect);
    });
  });
  describe('GET request for single review username(email) and id.', () => {
    it('Product review does not exist (returns a 204 status).', async () => {
      await supertest(app)
        .get(`/api/reviews/get_review/testing@test.com/0`)
        .expect(204);
    });
    it('User does not exist (returns a 204 status).', async () => {
      await supertest(app)
        .get(`/api/reviews/get_review/fakeuser@test.com/3`)
        .expect(204);
    });
    it('Both product review and user do not exist (returns a 204 status).', async () => {
      await supertest(app)
        .get(`/api/reviews/get_review/fakeuser@test.com/0`)
        .expect(204);
    });
    it('Gets the correct review (returns a 200 status).', async () => {
      const reviewProductId = 1;
      const reviewUsername = 'testing@test.com';
      const resultToExpect = {
        id: 46,
        products_id: 1,
        user_email: 'testing@test.com',
        full_name: 'Test Tester',
        comment: 'Bad!',
        rating: 2,
        image_link: 'https://avatars.githubusercontent.com/u/80404631?v=4',
      };
      const { body, statusCode } = await supertest(app).get(
        `/api/reviews/get_review/${reviewUsername}/${reviewProductId}`
      );

      expect(statusCode).toBe(200);
      expect(body).toEqual(resultToExpect);
    });
  });
  let reviewId;
  describe('POST request for a creating a new review.', () => {
    it('Adds a new review to the table (returns status 200).', async () => {
      const testReviewPayload = {
        data: {
          products_id: 1,
          user_email: 'testing@test.com',
          full_name: 'Test Tester',
          comment: 'Testing POST!',
          rating: 5,
          image_link: 'https://avatars.githubusercontent.com/u/80404631?v=4'
        }
      };
      const { body, statusCode } = await supertest(app)
        .post(`/api/reviews`)
        .send(testReviewPayload);
      reviewId = body;
      expect(statusCode).toBe(201);
    });
  });
  describe('PUT request for a changing review information.', () => {
    const testReviewPayload = {
      data: {
        full_name: 'Test Testing Tester',
        comment: 'Testing PUT!',
        rating: 4,
        image_link: 'https://avatars.githubusercontent.com/u/80404631?v=4'
      }
    };
    it('Review does not exist (returns a 404 status).', async () => {
      await supertest(app)
        .put(`/api/reviews/0`)
        .send(testReviewPayload)
        .expect(404);
    });
    it('Changes full_name, comment, rating and image_link (returns status 200).', async () => {
      const { body, statusCode } = await supertest(app)
        .put(`/api/reviews/${reviewId}`)
        .send(testReviewPayload);
      expect(statusCode).toBe(200);
    });
  });
  describe('DELETE request for removing a review from the table.', () => {
    it('Review does not exist (returns a 404 status).', async () => {
      await supertest(app).delete(`/api/reviews/0`).expect(404);
    });
    it('Deletes a review from the table (returns status 200).', async () => {
      const { body, statusCode } = await supertest(app).delete(
        `/api/reviews/${reviewId}`
      );
      expect(statusCode).toBe(200);
    });
  });
});
describe('ORDER REVIEWS', () => {
  describe('GET request for reviews by username(email) and order id.', () => {
    it('Order does not exist (returns a 204 status).', async () => {
      await supertest(app)
        .get(`/api/orderReviews/testing@test.com/0`)
        .expect(204);
    });
    it('User does not exist (returns a 204 status).', async () => {
      await supertest(app)
        .get(`/api/orderReviews/fakeuser@test.com/115`)
        .expect(204);
    });
    it('Both order and user do not exist (returns a 204 status).', async () => {
      await supertest(app)
        .get(`/api/orderReviews/fakeuser@test.com/0`)
        .expect(204);
    });
    it('Gets the correct reviews (returns a 200 status).', async () => {
      const reviewOrderId = 115;
      const reviewUsername = 'testing@test.com';
      const resultToExpect = [{
        id: 46,
        products_id: 1,
        user_email: 'testing@test.com',
        full_name: 'Test Tester',
        comment: 'Bad!',
        rating: 2,
        image_link: 'https://avatars.githubusercontent.com/u/80404631?v=4',
      }];
      const { body, statusCode } = await supertest(app).get(
        `/api/orderReviews/${reviewUsername}/${reviewOrderId}`
      );

      expect(statusCode).toBe(200);
      expect(body).toEqual(resultToExpect);
    });
  });
});

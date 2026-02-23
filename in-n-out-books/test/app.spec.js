const request = require('supertest');
const app = require('../src/app.js');
const books = require('../database/books.js');

describe('Chapter [Number]: API Tests', () => {

  it('GET /api/books - should return an array of books', async () => {
    const response = await request(app).get('/database/books');
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0)
  });

  test('GET /api/books/:id - should return a single book', async () => {
      const response = await request(app).get('/database/books/1');
      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toEqual(1);
    });

  test('GET /api/books/:id - should return 400 if id is not a number', async () => {
      const response = await request(app).get('/database/books/abc');
      expect(response.statusCode).toEqual(400);
      expect(response.body).toHaveProperty('error', 'ID must be a number');
    });
});
const request = require('supertest');
const app = require('../src/app');


describe('Chapter [Number]: API Tests', () => {
  // Test case a: Should return an array of books.
  it('Should return an array of books', async() => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);

    res.body.forEach((books) => {
      expect(books).toHaveProperty("id");
      expect(books).toHaveProperty("title");
      expect(books).toHaveProperty("author");
    });
  });

  // Test case b: Should return a single book.
  it('Should return a single book', async() => {
    const res = await request(app).get('/api/books/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', 1);
    expect(res.body).toHaveProperty('title', 'The Fellowship of the Ring');
    expect(res.body).toHaveProperty('author', 'J.R.R. Tolkien');
  });

  // Test case c: Should return a 400 error if the id is not a number.
  it("Should return a 400 error if the id is not a number", async() => {
    const res = await request(app).get('/api/books/e');
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Input must be a number");
  });
});
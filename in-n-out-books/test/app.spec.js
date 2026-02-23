const request = require('supertest');
const app = require('../src/app');


describe('Chapter [Number]: API Tests', () => {
  // Week 4 tests
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

  //Week 5 tests
  // Test case a: Should return a 201 status code when adding a new book.
  it('Should return a 201 status code when adding a new book', async() => {
    const res = await request(app).post('/api/books').send({
      id: 6,
      title: 'The Odyssey',
      author: 'Homer',
    });
    expect(res.statusCode).toEqual(201);
  });

  // Test case b: Should return a 400 status code when adding a new book with missing title.
  it('Should return a 400 status code when adding a new book with missing title', async() => {
    const res = await request(app).post('/api/books').send({
      author: 'Ernest Hemingway',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Title and Author are required');
  });

  // Test case c: Should return a 204 status code when deleting a book.
  it('Should return a 204 status code when deleting a book', async() => {
    const res = await request(app).delete('/api/books/5');

    expect(res.statusCode).toBe(204);
  });

  //Week 6 tests
  // Test case a: Should update a book and return a 204 status code.
  it('Should update a book and return a 204 status code', async() => {
    const res = await request(app).put('/api/books/1').send({
      id: 1,
      title: 'The Odyssey',
      author: 'Homer',
    });

    expect(res.statusCode).toEqual(204);
  });

  // Test case b: Should return a 400 status code when using a non-numeric id
  it('Should return a 400 status code when using a non-numeric id', async() => {
    const res = await request(app).put('/api/books/foo').send({
      title: 'Test Book',
      author: 'Test Author',
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Input must be a number');
  });

  // Test case c: Should return a 400 status code when updating a book with a missing title.
  it('Should return a 400 status code when updating a book with a missing title', async() => {
    const res = await request(app).put('/api/books/1').send({
      title: 'Test Title',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Bad Request')

    const res2 = await request(app).put('/api/books/1').send({
      title: 'Test Title',
      author: 'Test Author',
      extraKay: 'extra',
    });
    expect(res2.statusCode).toEqual(400);
    expect(res2.body.message).toEqual('Bad Request');
  });
});

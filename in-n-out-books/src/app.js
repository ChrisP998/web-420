/*
  Name: Christopher Phan
  Date: 2/1/26
  File Name: app.js
  Description: "in-n-out books" application
*/

const express = require('express');
const app = express();
const createError = require("http-errors");
const port = 3000;
const books = require("../database/books");

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>In-N-Out Books</title>
      <style>
        body { font-family: sans-serif; margin: 40px; background-color: #f4f4f4; }
        .container { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h1 { color: #333; }
        p { color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to In-N-Out Books</h1>
        <p>Your one-stop shop for all your reading needs!</p>
        <p>More features coming soon...</p>
      </div>
    </body>
    </html>
  `);
});

app.get('/api/books', async(req, res, next) => {
  try {
    const allBooks = await books.find();
    console.log('All Books:', allBooks);
    res.send(allBooks);
  } catch (err) {
    console.error('Error:', err.message);
    next(err);
  }
  try {
    const book = await books.findOne({id: Number(req.params.id)});
    console.log("Book", book);
    res.send(book);
  } catch (err) {
    console.error("Error:", err.message);
    next(err)
  }
  });

app.get('/api/books/:id', async(req, res, next) => {
  try {
    let {id} = req.params;
    id = parseInt(id);
    if (isNaN(id)) {
      return next(createError(400, 'Input must be a number'));
    }

    const oneBook = await books.findOne({id: id});

    console.log("Book:", oneBook);
    res.send(oneBook);
  } catch (err) {
    console.error("Error:", err.message);
    next(err);
  }
});

app.delete('/api/books/:id', async(req, res, next) => {
  try {
    const {id} = req.params;
    const result = await books.deleteOne({id: parseInt(id)});
    console.log('Result:', result);
    res.status(204).send();
  } catch (err) {
    if (err.message === "No matching item found") {
      return next(createError(404, 'Book not found'));
    }
  }
});

app.post('/api/books', async(req, res, next) => {
  try {
    const {title, author} = req.body;

    if (!title || !author) {
      return res.status(400).send({ message: 'Title and Author are required'});
    }

    const newBook = { title, author, createdAt: new Date()};
    const result = await books.insertOne(newBook);
    console.log('Result:', result);
    res.status(201).send({ id: result.insertedId});
  } catch (err) {
    console.error('Error:', err.message);
    next(err);
  }
});

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    type: 'error',
    status: err.status,
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  });
});

module.exports = app

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
}
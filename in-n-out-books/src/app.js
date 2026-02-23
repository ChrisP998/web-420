/*
  Name: Christopher Phan
  Date: 2/1/26
  File Name: app.js
  Description: "in-n-out books" application
*/

const express = require('express');
const app = express();
const port = 3000;

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

app.use((err, req, res, next) => {
  res.status(err.status || 500,);

  const errorDetails = {
    status: err.status || 500,
    message: err.message,
  };

  if (process.env.NODE_ENV === 'development') {
    errorDetails.stack = err.stack;
  }

  res.json(errorDetails);
});

app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

module.exports = app

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
}
/*
  Name: Christopher Phan
  Date: 2/1/26
  File Name: app.js
  Description: "in-n-out books" application
*/

const express = require('express');
const app = express()

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>In-N-Out Books</title>
        <style>
          body { font-family: sans-serif; text-align: center; padding: 25px;}
          h1 { color: red}
          p { color: black}
        </style>
      </head>
      <body>
        <h1>Welcome to In-N-Out Books!</h1>
        <p>Feel free to browse our collection!</p>
      </body>
    </html>`);
});

app.use((req, res, next) => {
  res.status(404).send('Page Not Found');
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  const isDevelopmentMode = process.env.NODE_ENV === 'Development Mode';

  res.status(500).json({
    status: 500,
    message: 'Internal Server Error',
    error: isDevelopmentMode ? err.stack : {}
  });
});

module.exports = app;
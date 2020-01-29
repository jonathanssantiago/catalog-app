const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');

app.use(cors());
app.use('/products', routes);

app.use(function (err, req, res) {
  res.status(err.status || 500).send({
    message: err.message,
    error: {}
  });
});

const PORT = 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
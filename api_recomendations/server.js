const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/product/most-popular', async (req, res) => {
  try {
    const response = await axios.get('https://wishlist.neemu.com/onsite/impulse-core/ranking/mostpopular.json');

    let productsMostPopular = response.data;

    if (!Object.keys(req.query).length || !req.query.maxProducts || req.query.maxProducts <= 10) {
      productsMostPopular = productsMostPopular.slice(0, 10);
    } else {
      productsMostPopular = productsMostPopular.slice(0, req.query.maxProducts);
    }

    res.json(productsMostPopular);
  } catch (e) {
    res.status(500).send(e);
  }
});


const PORT = 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
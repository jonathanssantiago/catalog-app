 const express = require('express');
 const controller = require('./controllers');

 const router = express.Router();

router.get('/most-popular', async (req, res) => {
   const response = await controller.getProductsMostPopular(req);
   res.json(response);
});

router.get('/price-reduction', async (req, res) => {
    const response = await controller.getProductsPriceReduction(req);
    res.json(response);
});

 module.exports = router;
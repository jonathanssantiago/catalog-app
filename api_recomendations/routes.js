 const express = require('express');
 const router = express.Router();
 const controller = require('./controllers');

router.get('/most-popular', async (req, res) => {
   const response = await controller.getProductsMostPopular(req);
   res.json(response);
});

router.get('/price-reduction', async (req, res) => {
    const response = await controller.getProductsPriceReduction(req);
    res.json(response);
});

 module.exports = router;
const express = require('express');
const controller = require('./controllers');

const router = express.Router();

router.get('/', async (req, res) => {
    const response = await controller.getProducts(req);
    res.json(response);
});

module.exports = router;
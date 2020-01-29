const Services = require('./../services');

const getProductsMostPopular = async (req) => {
    let paramMaxProducts = null;

    if (Object.keys(req.query).length && req.query.maxProducts) {
        paramMaxProducts = req.query.maxProducts;
    }

    const data = await Services.productsMostPopularService(paramMaxProducts);

    return data;
};

const getProductsPriceReduction = async (req) => {
    let paramMaxProducts = null;

    if (Object.keys(req.query).length && req.query.maxProducts) {
        paramMaxProducts = req.query.maxProducts;
    }

    const data = await Services.productsPriceReductionService(paramMaxProducts);

    return data;
};

module.exports = {
    getProductsMostPopular,
    getProductsPriceReduction
};
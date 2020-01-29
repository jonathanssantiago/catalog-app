const Services = require('./../services');

const getProducts = async (req) => {
    let paramMaxProducts = null;

    if (Object.keys(req.query).length && req.query.maxProducts) {
        paramMaxProducts = req.query.maxProducts;
    }

    const productsMostPopular = await Services.productsMostPopularService(paramMaxProducts);
    const productsPriceReduction = await Services.productsPriceReductionService(paramMaxProducts);

    return {
        "most_popular": productsMostPopular,
        "price_reduction": productsPriceReduction
    };
};

module.exports = {
    getProducts
};
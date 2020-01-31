const {ProductService} = require('./../services');

const getProducts = async (req) => {
    let paramMaxProducts = null;

    if (Object.keys(req.query).length && req.query.maxProducts) {
        paramMaxProducts = req.query.maxProducts;
    }
    
    const productsMostPopular = await ProductService.getProductsMostPopular(paramMaxProducts);
    const productsPriceReduction = await ProductService.getProductsPriceReduction(paramMaxProducts);

    return {
        "most_popular": productsMostPopular,
        "price_reduction": productsPriceReduction
    };
};

module.exports.getProducts = getProducts;
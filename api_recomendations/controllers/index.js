const {ProductService} = require('./../services');

const getProducts = async (req) => {
    let paramMaxProducts = null;

    if (Object.keys(req.query).length && req.query.maxProducts) {
        paramMaxProducts = req.query.maxProducts;
    }
    
    let productsMostPopular = await ProductService.getProductsMostPopular();
    let productsPriceReduction = await ProductService.getProductsPriceReduction();
       
     if (paramMaxProducts) {
         if (paramMaxProducts <= 10) {
             productsMostPopular = productsMostPopular.slice(0, 10);
             productsPriceReduction = productsPriceReduction.slice(0, 10);
         } else {
             productsMostPopular = productsMostPopular.slice(0, paramMaxProducts);
             productsPriceReduction = productsPriceReduction.slice(0, paramMaxProducts);
         }
     }

    return {
        "most_popular": productsMostPopular,
        "price_reduction": productsPriceReduction
    };
};

module.exports.getProducts = getProducts;
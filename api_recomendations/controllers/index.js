const axios = require('axios');
const redis = require('redis');
const cache = redis.createClient(process.env.REDIS_URL);


const requestApiCatalog = async idProduct => {
    try {
        const response = await axios.get(`http://${process.env.API_CATALOG_URL}/product/${idProduct}`);

        return Promise.resolve(response.data);
    } catch (e) {
        return Promise.resolve(null);
    }
};

const getProductsMostPopular = async (req) => {
    try {
        let productsMostPopular = [];
        
        await new Promise(async (resolve) => {
            cache.get('products-most-popular', async (err, products) => {
                if (products) {
                    productsMostPopular = JSON.parse(products);
                } else {
                    const responseApiRecomendation = await axios.get('https://wishlist.neemu.com/onsite/impulse-core/ranking/mostpopular.json');
                    productsMostPopular = responseApiRecomendation.data;
                    cache.set('products-most-popular', JSON.stringify(productsMostPopular));
                    cache.expire('products-most-popular', (60 * 60));
                }
                resolve(productsMostPopular);
            });
        })

        const responseApiCatalog = await Promise
            .all(productsMostPopular.map(async (p) => await requestApiCatalog(p.recommendedProduct.id)));

        const getProducts = responseApiCatalog
            .filter(r => (r !== null && r.complete.status === 'AVAILABLE'))
            .map(r => r.complete);

        let data = getProducts;

        if (Object.keys(req.query).length && req.query.maxProducts) {
            if (req.query.maxProducts <= 10) {
                data = getProducts.slice(0, 10);
            } else {
                data = getProducts.slice(0, req.query.maxProducts);
            }
        }

        return data;
    } catch (e) {

        console.log(e);
        return e;
    }
};

const getProductsPriceReduction = async (req) => {
    try {
        const response = await axios.get('https://wishlist.neemu.com/onsite/impulse-core/ranking/pricereduction.json');
        let productsPriceReduction = response.data;

        const responseApiCatalog = await Promise
            .all(productsPriceReduction.map(async (p) => await requestApiCatalog(p.recommendedProduct.id)));

        const getProducts = responseApiCatalog
            .filter(r => (r !== null && r.complete.status === 'AVAILABLE'))
            .map(r => r.complete);

        
        let data = getProducts;

        if (Object.keys(req.query).length && req.query.maxProducts) {
            if (req.query.maxProducts <= 10) {
                data = getProducts.slice(0, 10);
            } else {
                data = getProducts.slice(0, req.query.maxProducts);
            }
        }

        return data;
    } catch (e) {
        return e;
    }
};

module.exports = {
    getProductsMostPopular,
    getProductsPriceReduction
};
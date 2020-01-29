const axios = require('axios');

const getProductsMostPopular = async (req) => {
    try {
        const responseApiRecomendation = await axios.get('https://wishlist.neemu.com/onsite/impulse-core/ranking/mostpopular.json');
        let productsMostPopular = responseApiRecomendation.data;

        const requestApiCatalog = async idProduct => {
            try {
                const response = await axios.get(`http://api_catalog:5000/product/${idProduct}`)
                return Promise.resolve(response.data);
            } catch (e) {
                return Promise.resolve(null);
            }
        }

        const responseApiCatalog = await Promise
            .all(productsMostPopular.map(async (p) => await requestApiCatalog(p.recommendedProduct.id)));

        const getProducts = responseApiCatalog
            .filter(r => (r !== null && r.complete.status === 'AVAILABLE'))
            .map(r => r.complete);

        let data = [];

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
}

const getProductsPriceReduction = async (req) => {
    try {
        const response = await axios.get('https://wishlist.neemu.com/onsite/impulse-core/ranking/pricereduction.json');

        let productsPriceReduction = response.data;

        const requestApiCatalog = async idProduct => {
            try {
                const response = await axios.get(`http://api_catalog:5000/product/${idProduct}`)
                return Promise.resolve(response.data);
            } catch (e) {
                return Promise.resolve(null);
            }
        }

        const responseApiCatalog = await Promise
            .all(productsPriceReduction.map(async (p) => await requestApiCatalog(p.recommendedProduct.id)));

        const getProducts = responseApiCatalog
            .filter(r => (r !== null && r.complete.status === 'AVAILABLE'))
            .map(r => r.complete);

        let data = [];

        if (Object.keys(req.query).length && req.query.maxProducts) {
            if (req.query.maxProducts <= 10) {
                data = getProducts.slice(0, 10);
            } else {
                data = getProducts.slice(0, req.query.maxProducts);
            }
        }

        return data;
    } catch (e) {
        console.log(e, 11);
        return e;
    }
}

module.exports = {
    getProductsMostPopular,
    getProductsPriceReduction
};
const axios = require("axios");
const redis = require("redis");
const cache = redis.createClient(process.env.REDIS_URL);
const { promisify } = require('util');
const getCacheAsync = promisify(cache.get).bind(cache);

function ProductService() {

}

ProductService.prototype.getProductsMostPopular = async maxProducts => {
    try {
        const productsMostPopular = await requestApiProductsMostPopular();

        const responseApiCatalog = await Promise.all(
            productsMostPopular.map(
                async p => await requestApiCatalog(p.recommendedProduct.id)
            )
        );

        const getProducts = responseApiCatalog
            .filter(r => r !== null && r.complete.status === "AVAILABLE")
            .map(r => r.complete);

        let data = getProducts;

        if (maxProducts) {
            if (maxProducts <= 10) {
                data = getProducts.slice(0, 10);
            } else {
                data = getProducts.slice(0, maxProducts);
            }
        }

        return data;
    } catch (e) {
        return [];
    }
};

ProductService.prototype.getProductsPriceReduction = async maxProducts => {
    try {
        const productsPriceReduction = await requestApiProductsPriceReduction();

        const responseApiCatalog = await Promise.all(
            productsPriceReduction.map(
                async p => await requestApiCatalog(p.recommendedProduct.id)
            )
        );

        const getProducts = responseApiCatalog
            .filter(r => r !== null && r.complete.status === "AVAILABLE")
            .map(r => r.complete);

        let data = getProducts;

        if (maxProducts) {
            if (maxProducts <= 10) {
                data = getProducts.slice(0, 10);
            } else {
                data = getProducts.slice(0, maxProducts);
            }
        }

        return data;
    } catch (e) {
        return [];
    }
};

const requestApiCatalog = async idProduct => {
    try {
        const getProductCatalogCache = await getCacheAsync(`catalog.product-${idProduct}`);

        if (!getProductCatalogCache) {
            responseApiCatalog = await axios.get(
                `http://${process.env.API_CATALOG_URL}/api/product/${idProduct}`
            );

            return responseApiCatalog.data;
        }

        return JSON.parse(getProductCatalogCache);
    } catch (e) {
        return null;
    }
};

const requestApiProductsMostPopular = async () => {
    const getProductsMostPopularCache = await getCacheAsync('recomendations.products-most-popular');

    if (!getProductsMostPopularCache) {
        const responseApiRecomendation = await axios.get(
            "https://wishlist.neemu.com/onsite/impulse-core/ranking/mostpopular.json"
        );
        cache.set("recomendations.products-most-popular", JSON.stringify(responseApiRecomendation.data));
        cache.expire("recomendations.products-most-popular", 60 * 5);

        return responseApiRecomendation.data;
    }
    return JSON.parse(getProductsMostPopularCache);
}

const requestApiProductsPriceReduction = async () => {
    const getProductsPriceReductionCache = await getCacheAsync('recomendations.products-price-reduction');

    if (!getProductsPriceReductionCache) {
        const responseApiRecomendation = await axios.get(
            "https://wishlist.neemu.com/onsite/impulse-core/ranking/pricereduction.json"
        );
        cache.set("recomendations.products-price-reduction", JSON.stringify(responseApiRecomendation.data));
        cache.expire("recomendations.products-price-reduction", 60 * 5);

        return responseApiRecomendation.data;
    }
    return JSON.parse(getProductsPriceReductionCache);
}

module.exports.ProductService = new ProductService;
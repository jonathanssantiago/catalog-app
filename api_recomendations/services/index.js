const axios = require("axios");
const redis = require("redis");
const cache = redis.createClient(process.env.REDIS_URL);

const requestApiCatalog = async idProduct => {
    try {
        const response = await axios.get(
            `http://${process.env.API_CATALOG_URL}/api/product/${idProduct}`
        );
        return Promise.resolve(response.data);
    } catch (e) {
        return Promise.resolve(null);
    }
};

const productsMostPopularService = async maxProducts => {
    try {
        const productsMostPopular = await new Promise(async (resolve) => {
            cache.get("products-most-popular", async (err, data) => {
                if (!data) {
                    const responseApiRecomendation = await axios.get(
                        "https://wishlist.neemu.com/onsite/impulse-core/ranking/mostpopular.json"
                    );
                    cache.set(
                        "products-most-popular",
                        JSON.stringify(responseApiRecomendation.data)
                    );
                    cache.expire("products-most-popular", 60 * 3);
                    resolve(responseApiRecomendation.data);
                } else {
                    resolve(JSON.parse(data));
                }
            });
        });

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

const productsPriceReductionService = async maxProducts => {
    try {
        const productsPriceReduction = await new Promise(async resolve => {
            cache.get("products-price-reduction", async (err, data) => {
                if (!data) {
                    const responseApiRecomendation = await axios.get(
                        "https://wishlist.neemu.com/onsite/impulse-core/ranking/pricereduction.json"
                    );
                    cache.set(
                        "products-price-reduction",
                        JSON.stringify(responseApiRecomendation.data)
                    );
                    cache.expire("products-price-reduction", 60 * 3);
                    resolve(responseApiRecomendation.data);
                } else {
                    resolve(JSON.parse(data));
                }
            });
        });

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

module.exports = {
    productsMostPopularService,
    productsPriceReductionService
};

import api from './api';

const getProductsMostPopular = async () => {
    try {
        const response = await api('GET', 'products/most-popular?maxProducts=16');

        return {
            status: true,
            data: JSON.parse(response)
        };
    } catch (e) {
        return {
            status: false,
            message: e
        }
    }
}

const getProductsPriceReduction = async () => {
    try {
        const response = await api('GET', 'products/price-reduction?maxProducts=16');

        return {
            status: true,
            data: JSON.parse(response)
        };
    } catch (e) {
        return {
            status: false,
            message: e
        }
    }
}

export {
    getProductsMostPopular,
    getProductsPriceReduction
};
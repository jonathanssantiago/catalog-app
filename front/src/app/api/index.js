import api from './api';

const getProductsMostPopular = async () => {
    try {
        const response = await api('GET', 'http://localhost:3000/product/most-popular');

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
        const response = await api('GET', 'http://localhost:3000/product/most-popular');

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
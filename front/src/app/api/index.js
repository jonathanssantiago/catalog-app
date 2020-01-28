import api from './api';

const getProductsMostPopular = async () => {
    try {
        const response = await api('GET', 'http://localhost:5000/product/9101');

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
        const response = await api('GET', 'http://localhost:5000/product/9101');

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
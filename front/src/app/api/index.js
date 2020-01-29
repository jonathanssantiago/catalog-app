import api from './api';

export const getProducts = async () => {
    try {
        const response = await api('GET', 'products?maxProducts=16');

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
};


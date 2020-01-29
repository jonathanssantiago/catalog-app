import api from './api';

export const getProducts = async () => {
    try {
        const response = await api('GET', 'products?maxProducts=16');
        const data = await response.json();

        return {
            status: true,
            data: data
        };
    } catch (e) {
        return {
            status: false,
            message: e
        }
    }
};


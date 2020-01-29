import * as Api from './api';

window.onload = async () => {
    Api.getProductsMostPopular();
    Api.getProductsPriceReduction();
}
import * as Api from './api';

window.onload = async () => {
    const resp = await Api.getProductsMostPopular();

    console.log(resp);
}
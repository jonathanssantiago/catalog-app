import * as Api from './api';

window.onload = async () => {
    Api.getProducts().then(r => {
        console.log(r);
    });
};
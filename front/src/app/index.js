import * as Api from './api';
import * as slider from './sliders';
import * as loading from './loading';

window.onload = async () => {
    loading.startLoading();

    Api.getProducts()
        .then(r => {
            slider.listProductsMostPopular(r.data.most_popular);
            slider.listProductsPriceReduction(r.data.price_reduction);
        })
        .then(() => {
            showSlides(1, 'slide-most-popular');
            showSlides(1, 'slide-price-reduction');
        })
        .finally(() => {
            loading.stopLoading();
        });
};

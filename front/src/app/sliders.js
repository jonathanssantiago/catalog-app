var slideIndex = 1;

const listProductsMostPopular = products => {
    const itensMostPopular = [];
    products.forEach((v, k) => {
        itensMostPopular.push(`
        <div class="item">
            <img src="https:${v.images.default}">
            <h3>${v.name}</h3> 
            <div class="price-product">
                <small> Por </small> 
                <h3>${v.price}</h3>
            </div> 
            <div class="price-product">
                <small>${v.installment.count}x</small> 
                <h5>R$ ${v.installment.price}</h5> 
            </div>
        </div>`);
    });

    const sectionMostPopular1 = document.querySelector('#most-popular-section-1');
    const sectionMostPopular2 = document.querySelector('#most-popular-section-2');
    const sectionMostPopular3 = document.querySelector('#most-popular-section-3');
    const sectionMostPopular4 = document.querySelector('#most-popular-section-4');

    sectionMostPopular1.innerHTML = ` 
    <a onclick="plusSlideMostPopular(-1)" class="arrow__btn">‹</a>
    ${itensMostPopular.slice(0, 4).join().replace(/,/g, '')}
    <a onclick="plusSlideMostPopular(1)" class="arrow__btn">›</a>`;
    sectionMostPopular2.innerHTML = ` 
    <a onclick="plusSlideMostPopular(-1)" class="arrow__btn">‹</a>
    ${itensMostPopular.slice(4, 8).join().replace(/,/g, '')}
    <a onclick="plusSlideMostPopular(1)" class="arrow__btn">›</a>`;
    sectionMostPopular3.innerHTML = ` 
    <a onclick="plusSlideMostPopular(-1)" class="arrow__btn">‹</a>
    ${itensMostPopular.slice(8, 12).join().replace(/,/g, '')}
    <a onclick="plusSlideMostPopular(1)" class="arrow__btn">›</a>`;
    sectionMostPopular4.innerHTML = ` 
    <a onclick="plusSlideMostPopular(-1)" class="arrow__btn">‹</a>
    ${itensMostPopular.slice(12, 16).join().replace(/,/g, '')}
    <a onclick="plusSlideMostPopular(1)" class = "arrow__btn">›</a>`;
}

const listProductsPriceReduction = products => {
    const itensPriceReduction = [];
    products.forEach((v, k) => {
        itensPriceReduction.push(`
        <div class="item">
            <img src="https:${v.images.default}">
            <h3>${v.name}</h3> 
            <div class="price-product">
                <small> Por </small> 
                <h3>${v.price}</h3>
            </div> 
            <div class="price-product">
                <small>${v.installment.count}x</small> 
                <h5>R$ ${v.installment.price}</h5> 
            </div>
        </div>`);
    });

    const sectionPriceReduction1 = document.querySelector('#price-reduction-section-1');
    const sectionPriceReduction2 = document.querySelector('#price-reduction-section-2');
    const sectionPriceReduction3 = document.querySelector('#price-reduction-section-3');
    const sectionPriceReduction4 = document.querySelector('#price-reduction-section-4');

    sectionPriceReduction1.innerHTML = ` 
    <a onclick="plusSlidePriceReduction(-1)" class="arrow__btn">‹</a>
    ${itensPriceReduction.slice(0, 4).join().replace(/,/g, '')}
    <a onclick="plusSlidePriceReduction(1)" class = "arrow__btn">›</a>`;
    sectionPriceReduction2.innerHTML = ` 
    <a onclick="plusSlidePriceReduction(-1)" class="arrow__btn">‹</a>
    ${itensPriceReduction.slice(4, 8).join().replace(/,/g, '')}
    <a onclick="plusSlidePriceReduction(1)" class = "arrow__btn">›</a>`;
    sectionPriceReduction3.innerHTML = ` 
    <a onclick="plusSlidePriceReduction(-1)" class="arrow__btn">‹</a>
    ${itensPriceReduction.slice(8, 12).join().replace(/,/g, '')}
    <a onclick="plusSlidePriceReduction(1)" class = "arrow__btn">›</a>`;
    sectionPriceReduction4.innerHTML = ` 
    <a onclick="plusSlidePriceReduction(-1)" class="arrow__btn">‹</a>
    ${itensPriceReduction.slice(12, 16).join().replace(/,/g, '')}
    <a onclick="plusSlidePriceReduction(1)" class = "arrow__btn">›</a>`;
}

window.plusSlideMostPopular = function (n) {
    showSlides(slideIndex += n, 'slide-most-popular');
}

window.plusSlidePriceReduction = function (n) {
    showSlides(slideIndex += n, 'slide-price-reduction');
}

window.showSlides = function (n, idSlide) {
    var i;
    var slides = document.getElementsByClassName(idSlide);
    if (n > slides.length) {
        slideIndex = 1
    }

    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "flex";
}

export {
    listProductsMostPopular,
    listProductsPriceReduction
}
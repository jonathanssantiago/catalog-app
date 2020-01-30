const startLoading = () => {
    const carouselSliders = document.getElementById('carousel-sliders');
    carouselSliders.children[0].style.display = 'none';
    carouselSliders.children[1].style.display = 'none';

    const divLoading = document.createElement('div');
    divLoading.setAttribute('id', 'loading');

    const loading = document.createElement('img');
    loading.src = 'http://d37wngjgjw2uqh.cloudfront.net/Content/Images/loading-default.gif';
    divLoading.appendChild(loading);

    const textLoading = document.createElement('p');
    textLoading.appendChild(document.createTextNode("carregando..."));
    divLoading.appendChild(textLoading);
    carouselSliders.appendChild(divLoading);
    divLoading.style.display = 'flex';
    divLoading.style.flexDirection = 'column';
    divLoading.style.alignItems = 'center';
}

const stopLoading = () => {
    const carouselSliders = document.getElementById('carousel-sliders');
    carouselSliders.removeChild(document.getElementById('loading'));
    carouselSliders.children[0].style.display = 'block';
    carouselSliders.children[1].style.display = 'block';
}

export {
    startLoading,
    stopLoading
};
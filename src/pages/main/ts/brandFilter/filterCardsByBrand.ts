import data from '../../../../assets/products.json';
import renderProuductsCards from '../renderProuductsCards';

function filterCardsByBrand(): void {
    let filteredBrands: string[];

    if (!JSON.parse(localStorage.getItem('query') || '').hasOwnProperty('brand')) {
        filteredBrands = [''];
    } else {
        filteredBrands = JSON.parse(localStorage.getItem('query') || '').brand.split(',');
    }
    const ProductDataCards = data.products;
    const filteredByBrandsCards = ProductDataCards.filter(({ brand }) => filteredBrands?.includes(brand));

    if (filteredBrands?.length !== 1) {
        localStorage.setItem('productCards', JSON.stringify(filteredByBrandsCards));
        renderProuductsCards(filteredByBrandsCards);
    } else if (filteredBrands[0] && filteredBrands?.length == 1) {
        localStorage.setItem('productCards', JSON.stringify(filteredByBrandsCards));
        renderProuductsCards(filteredByBrandsCards);
    } else {
        localStorage.setItem('productCards', JSON.stringify(ProductDataCards));
        renderProuductsCards(ProductDataCards);
    }
}

export default filterCardsByBrand;

import data from '../../../assets/products.json';
import { allPrices, allStocks } from './productsData';
import renderProuductsCards from './renderProuductsCards';
import sort from './sorting/sort';
interface queryData {
    priceMax?: number;
    priceMin?: number;
    stockMax?: number;
    stockMin?: number;
    brand?: string;
    category?: string;
    search?: string;
    title?: string;
}

function filterController() {
    const query: queryData = JSON.parse(localStorage.getItem('query') || '');
    const productsList = data.products;
    let filterdProducts = productsList;

    if (query.category) {
        filterdProducts = productsList.filter((product) =>
            query.category?.split(',').some((categoryName) => categoryName == product.category)
        );
    }

    if (query.brand) {
        filterdProducts = filterdProducts.filter((product) =>
            query.brand?.split(',').some((brandName) => brandName == product.brand)
        );
    }

    const sortedAllPrices = allPrices.sort((a, b) => a - b);
    const lowestProductPrice = sortedAllPrices[0];
    const hieghtProductPrice = sortedAllPrices[sortedAllPrices.length - 1];

    const sortedAllStocks = allStocks.sort((a, b) => a - b);
    const lowestProductStock = sortedAllStocks[0];
    const hieghtProductStock = sortedAllStocks[sortedAllStocks.length - 1];

    const searchInput = document.querySelector('.search-form__input') as HTMLInputElement;

    const filterdProductsByRange = filterdProducts.filter((product) => {
        return (
            (query.priceMin || lowestProductPrice) <= product.price &&
            (query.priceMax || hieghtProductPrice) >= product.price &&
            (query.stockMin || lowestProductStock) <= product.stock &&
            (query.stockMax || hieghtProductStock) >= product.stock &&
            product.title?.toLowerCase().includes(searchInput.value.toLowerCase())
        );
    });

    localStorage.setItem('productCards', JSON.stringify(filterdProductsByRange));
    renderProuductsCards(filterdProductsByRange);
    sort();
}
export default filterController;

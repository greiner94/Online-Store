import data from '../../../assets/products.json';
import { allPrices, allStocks } from './productsData';
import renderProuductsCards from './renderProuductsCards';
import sort from './sorting/sort';
import img from '../../../assets/img/no-product.png';
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
    if (document.querySelector('.cards-block')) {
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
                (product.title?.toLowerCase().includes(searchInput.value.toLowerCase()) ||
                    product.description?.toLowerCase().includes(searchInput.value.toLowerCase()) ||
                    product.stock?.toString().includes(searchInput.value) ||
                    product.price?.toString().includes(searchInput.value) ||
                    product.brand?.toLowerCase().includes(searchInput.value.toLowerCase()) ||
                    product.category?.toLowerCase().includes(searchInput.value.toLowerCase()))
            );
        });

        localStorage.setItem('productCards', JSON.stringify(filterdProductsByRange));
        if (filterdProductsByRange.length != 0) {
            renderProuductsCards(filterdProductsByRange);
            sort();
        } else {
            renderNoProductNotification();
        }
    }
}

function renderNoProductNotification() {
    const productsWrapper = document.querySelector('.cards-block') as HTMLElement;
    const productWrapperInnerHtml = `
        <div class='products-not-found'>
            <img src=${img} alt='products not found'>
        </div>
    `;
    productsWrapper.innerHTML = productWrapperInnerHtml;
}
export default filterController;

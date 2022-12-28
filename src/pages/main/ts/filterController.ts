import data from '../../../assets/products.json';
import { allPrices } from './productsData';
import renderProuductsCards from './renderProuductsCards';
interface queryData {
    priceMax?: number;
    priceMin?: number;
    rating?: number;
    stock?: number;
    brand?: string;
    category?: string;
}

function filterController() {
    const query: queryData = JSON.parse(localStorage.getItem('query') || '');
    const productsList = data.products;

    let filterdProducts = productsList.filter((product) => {
        return (
            query.category?.split(',').some((categoryName) => categoryName == product.category) ||
            query.brand?.split(',').some((brandName) => brandName == product.brand)
        );
    });
    filterdProducts = filterdProducts.length > 0 ? filterdProducts : productsList;
    const sortedAllPrices = allPrices.sort((a, b) => a - b);
    const loweststProductPrice = sortedAllPrices[0];
    const hieghtstProductPrice = sortedAllPrices[sortedAllPrices.length - 1];
    const filterdProductsByRange = filterdProducts.filter(
        (product) =>
            (query.priceMin || loweststProductPrice) <= product.price &&
            (query.priceMax || hieghtstProductPrice) >= product.price
    );

    localStorage.setItem('productCards', JSON.stringify(filterdProductsByRange));
    renderProuductsCards(filterdProductsByRange);
}
export default filterController;

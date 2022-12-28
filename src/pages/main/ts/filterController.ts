import data from '../../../assets/products.json';
import renderProuductsCards from './renderProuductsCards';
interface queryData {
    price?: number;
    rating?: number;
    stock?: number;
    brand?: string;
    category?: string;
}

function filterController() {
    const query: queryData = JSON.parse(localStorage.getItem('query') || '');
    const productsList = data.products;
    console.log(query);

    const filterdProducts = productsList.filter((product) => {
        return (
            query.category?.split(',').some((categoryName) => categoryName == product.category) ||
            query.brand?.split(',').some((brandName) => brandName == product.brand)
        );
    });

    if (filterdProducts.length == 0) {
        localStorage.setItem('productCards', JSON.stringify(productsList));
        renderProuductsCards(productsList);
    } else {
        localStorage.setItem('productCards', JSON.stringify(filterdProducts));
        renderProuductsCards(filterdProducts);
    }
}
export default filterController;

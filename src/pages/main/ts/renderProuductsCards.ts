<<<<<<<< HEAD:src/pages/main/ts/renderProuductsCards.ts
interface productData {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

function renderProuductsCards(productData: productData[]) {
    const cardsWrapper = document.querySelector('.card-block') as HTMLElement;
    let cardsWrapperHtml = '';

    productData.forEach(({ title, price, rating, thumbnail }) => {
========
import data from '../../../assets/products.json';
import { addCart } from './addToCart';
const productsList = data.products;

function productsCards() {
    const cardsWrapper = document.querySelector('.card-block') as HTMLElement;
    let cardsWrapperHtml = '';

    productsList.forEach(({ id, title, price, rating, thumbnail }) => {
>>>>>>>> b8e6b5f3e5ed759ed530a41eb6cd3e781e5609c4:src/pages/main/ts/productsCards.ts
        cardsWrapperHtml += `
          <article class="card">
            <img src="${thumbnail}" class="card__photo"></img>
              <h3 class="card__header">${title}</h3>
              <div class="card__data">
                <div class="rating">${rating}/5</div>
                <div class="price-cart-line">
                  <div class="price money">${price}</div>
                  <div class="add-cart" data-id="${id}" data-amount="0" data-price="${price}"}"></div>
                </div>
                <div class="available">Available</div>
              </div>
            </article>
        `;
    });
    cardsWrapper.innerHTML = cardsWrapperHtml;
    addCart();
}

<<<<<<<< HEAD:src/pages/main/ts/renderProuductsCards.ts
export default renderProuductsCards;
========
export default productsCards;
>>>>>>>> b8e6b5f3e5ed759ed530a41eb6cd3e781e5609c4:src/pages/main/ts/productsCards.ts

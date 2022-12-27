import { listenAddCart, checkAddingCart } from './addToCart';
import { getClassMode } from './getLocalStorageParams';
//import { changePageWithMode } from './switchMode';
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
    // changePageWithMode();
    const cardsWrapper = document.querySelector('.cards-block') as HTMLElement;
    cardsWrapper.classList.add(`${getClassMode()}-block`);
    let cardsWrapperHtml = '';
    productData.forEach(({ id, title, price, rating, thumbnail }) => {
        const classAdd = checkAddingCart(id) ? ' add' : '';
        cardsWrapperHtml += `
        <article class="card">
        <img src="${thumbnail}" class="card__photo"></img>
          <h3 class="card__header">${title}</h3>
          <div class="card__data">
            <div class="rating">${rating}/5</div>
            <div class="price-cart-line">
              <div class="price money">${price}</div>
              <div class="add-cart${classAdd}" data-id="${id}" data-amount="0" data-price="${price}"></div>
            </div>
            <div class="available">Available</div>
          </div>
        </article>
    `;
    });
    cardsWrapper.innerHTML = cardsWrapperHtml;
    listenAddCart();
}

export default renderProuductsCards;

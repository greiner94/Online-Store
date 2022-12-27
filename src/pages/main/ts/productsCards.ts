import data from '../../../assets/products.json';
import { addCart } from './addToCart';
const productsList = data.products;

function productsCards() {
    const cardsWrapper = document.querySelector('.card-block') as HTMLElement;
    let cardsWrapperHtml = '';

    productsList.forEach(({ id, title, price, rating, thumbnail }) => {
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

export default productsCards;

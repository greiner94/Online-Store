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
        cardsWrapperHtml += `
          <article class="card">
            <a href="product.html" rel="bookmark">
              <img src="${thumbnail}" class="card__photo"></img>
              <h3 class="card__header">${title}</h3>
              <div class="card__data">
                <div class="rating">${rating}/5</div>
                <div class="price-cart-line">
                  <div class="price money">${price}</div>
                  <div class="add-cart"></div>
                </div>
                <div class="available">Available</div>
              </div>
            </a>
          </article>
        `;
    });
    cardsWrapper.innerHTML = cardsWrapperHtml;
}

export default renderProuductsCards;

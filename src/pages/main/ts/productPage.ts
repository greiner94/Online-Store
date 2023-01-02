import data from '../../../assets/products.json';
import homeIcon from '../../../assets/img/home_icon.svg';
import availableIcon from '../../../assets/img/available_icon.svg';
import emptyCartIcon from '../../../assets/img/card_cart_icon_empty.svg';
import '../style/product.scss';

function productPage() {
    const cardsWrapper = document.querySelector('.cards-block') as HTMLElement;

    cardsWrapper.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLElement;
        if (target.closest('.card') && !target.classList.contains('add-cart')) {
            const productId = target.closest('.card')?.querySelector('.add-cart')?.getAttribute('data-id') || '0';
            window.history.pushState({}, '', `/product/${productId}`);
            renderProductPage(productId);
        }
    });
}

function renderProductPage(productId: string) {
    const productsList = data.products;
    const currProduct = productsList.filter(({ id }) => id == +productId);
    const {
        title,
        description,
        price,
        discountPercentage,
        rating,
        brand,
        category,
        thumbnail,
        images,
        stock,
    } = currProduct[0];
    const innerHtml = `
      <main class="product-page">

      <nav class="breadcrumbs">
        <a href="/" class="breadcrumbs__home">
          <img src="${homeIcon}" alt="home icon">
        </a>
        <a href="#" class="breadcrumbs__item">
          ${category}
        </a>
        <a href="#" class="breadcrumbs__item">
          ${brand}
        </a>
        <a href="#" class="breadcrumbs__item">
          ${title}
        </a>
      </nav>

      <h1 class="product-page__title">
        ${title}
      </h1>
      <div class="product-page__rating">${rating}/5</div>
      <div class="product-page__wrapper">
        <div class="visual">
          <div class="visual__images">
            <div class="visual__mini">
              <div class="visual__mini-img">
                  <img src="${images[0]}" alt="mini product image">
              </div>
              <div class="visual__mini-img">
                <img src="${images[1]}" alt="mini product image">
              </div>
              <div class="visual__mini-img">
                <img src="${images[2]}" alt="mini product image">
              </div>
            </div>
            <div class="visual__big-img">
              <img src="${thumbnail}" alt="big product image">
            </div>
          </div>
          <div class="description">
            <div class="description__title">
              Description
            </div>
            <div class="description__text">
              ${description}
            </div>
          </div>
        </div>
        <div class="info">
          <div class="info__wrapper">
            <div class="status-wrapper">
              <div class="available-page">
                <div class="available-page__icon">
                  <img src="${availableIcon}" alt="available icon">
                </div>
                <div class="available-page__name">
                  Available
                </div>
              </div>
              <div class="price-page money">
                ${price}
              </div>
            </div>    
            <div class="btns-wrapper">
              <button class="add-btn">
                <div class="add-btn__img">
                  <img src="${emptyCartIcon}" alt="decoration">
                  <div class="add-btn__amount">
                    1
                  </div>
                </div>
                <div class="add-btn__text">
                  Add to Cart
                </div>
              </button>
              <button class="btn">Buy Now</button>
          </div>    
          </div>
          <div class="details">
            <div class="details__meta-wrapper">
              <div class="details__meta-name">
                Category:
              </div>
              <div class="details__meta-value">
              ${category}
              </div>
            </div>
            <div class="details__meta-wrapper">
              <div class="details__meta-name">
                Stock:
              </div>
              <div class="details__meta-value">
              ${stock}
              </div>
            </div>
            <div class="details__meta-wrapper">
              <div class="details__meta-name">
                Brand:
              </div>
              <div class="details__meta-value">
                ${brand}
              </div>
            </div>
            <div class="details__meta-wrapper">
              <div class="details__meta-name">
                Discount:  
              </div>
              <div class="details__meta-value details__meta-value_discount">
                ${discountPercentage}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    `;
    const main = document.querySelector('.main') as HTMLElement;
    main.insertAdjacentHTML('afterend', innerHtml);
    main.remove();
    imgSwitcher();
    handleModal();
}

function imgSwitcher() {
    const images = document.querySelectorAll('.visual__mini-img img') as NodeListOf<HTMLImageElement>;
    const bigImage = document.querySelector('.visual__big-img img') as HTMLImageElement;
    images.forEach((smallImg) => {
        smallImg.addEventListener('click', () => {
            bigImage.src = smallImg.src;
        });
    });
}
function handleModal() {
    const buyNowBtn = document.querySelector('.btn') as HTMLElement;
    const modal = document.querySelector('.modal-wrap') as HTMLElement;
    buyNowBtn.addEventListener('click', () => {
        modal.classList.remove('none');
    });
    const modalBackground = modal.querySelector('.blackout');
    modalBackground?.addEventListener('click', () => {
        modal.classList.add('none');
    });
}

export default productPage;

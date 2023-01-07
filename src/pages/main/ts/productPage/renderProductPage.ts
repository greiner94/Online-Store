import data from '../../../../assets/products.json';
import homeIcon from '../../../../assets/img/home_icon.svg';
import availableIcon from '../../../../assets/img/available_icon.svg';
import emptyCartIcon from '../../../../assets/img/card_cart_icon_empty.svg';
import { getCartFromLocalStorage, getTotalCartSum } from '../getLocalStorageParams';
import { setCartDataToLocalStorage } from '../setLocalStorageParams';
import { displayHeaderCartAmount } from '../addToCart';

function renderProductPage() {
    const url = new URL(window.location.href);
    const searchParams = <URLSearchParams>url.searchParams;
    const productId = searchParams.get('product') || '';
    const productsList = data.products;
    const currProduct = productsList.filter(({ id }) => id == +productId);
    const {
        id,
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
      <main class="main product-page">

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
                  <img src="${thumbnail}" alt="mini product image">
              </div>
              ${
                  images[0]
                      ? `
                        <div class="visual__mini-img">
                          <img src="${images[0]}" alt="mini product image">
                        </div>
                        `
                      : ''
              }
              ${
                  images[1]
                      ? `
                        <div class="visual__mini-img">
                          <img src="${images[1]}" alt="mini product image">
                        </div>
                        `
                      : ''
              }
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
              <button class="add-btn" data-id="${id}" data-amount="0" data-price="${price}">
                <div class="add-btn__img">
                  <img src="${emptyCartIcon}" alt="decoration">
                  <div class="add-btn__amount add-btn__amount_none">
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
    addToCartButton();
    setQuantityOfProductToBtn();
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
    buyNowBtn.addEventListener('click', () => {
        //TODO
    });
}
function addToCartButton() {
    const addBtn = document.querySelector('.add-btn') as HTMLElement;
    const idOfCurrProduct = Number(addBtn.getAttribute('data-id'));

    addBtn.addEventListener('click', () => {
        const checkedProducts = getCartFromLocalStorage();
        const currProduct = checkedProducts.filter((product) => idOfCurrProduct == product.id);
        const { id, amount, price } = currProduct[0] || {
            id: Number(addBtn.getAttribute('data-id')),
            amount: Number(addBtn.getAttribute('data-amount')),
            price: Number(addBtn.getAttribute('data-price')),
        };
        const productsWithoutCurr = checkedProducts.filter((product) => product.id !== id);
        const newProductList = [...productsWithoutCurr, { id, amount: amount + 1, price }];

        setCartDataToLocalStorage(newProductList);
        setQuantityOfProductToBtn();
        addProductAmountToStorage();

        const totalCountProducts = JSON.parse(localStorage.getItem('all-amount') || '0');
        displayHeaderCartAmount(totalCountProducts);

        const headerTotalSum = document.querySelector('.cart-total__sum') as HTMLElement;
        headerTotalSum.textContent = getTotalCartSum().toString();
    });
}
function setQuantityOfProductToBtn() {
    const btnAmount = document.querySelector('.add-btn__amount') as HTMLElement;
    const addBtn = document.querySelector('.add-btn') as HTMLElement;
    const idOfCurrProduct = Number(addBtn.getAttribute('data-id'));
    const checkedProducts = getCartFromLocalStorage();
    const currProduct = checkedProducts.filter((product) => idOfCurrProduct == product.id);
    const amountOfCurrProduct = currProduct[0] ? currProduct[0].amount : 0;
    if (amountOfCurrProduct) {
        btnAmount.classList.remove('add-btn__amount_none');
    }
    btnAmount.textContent = amountOfCurrProduct.toString();
}
function addProductAmountToStorage() {
    const amount = Number(localStorage.getItem('all-amount'));
    const amountInc = (amount + 1).toString();
    localStorage.setItem('all-amount', amountInc);
}

export default renderProductPage;

import '../style/cart.scss';
import { displayBreadcrumbs } from './breadcrumbsDisplay';
import { getCartFromLocalStorage } from './getLocalStorageParams';
import data from '../../../assets/products.json';
import { CartData } from './type';

export function listenHeaderCart(): void {
    const headerCartElement = document.querySelector('.cart');
    headerCartElement?.addEventListener('click', displayCart);
}

function displayCart() {
    hideMainPage();
    displayBreadcrumbs();
    const main = <HTMLElement>document.querySelector('.main');
    const cartFragment = <DocumentFragment>document.createDocumentFragment();
    const cartHead = document.createElement('div');
    cartHead.classList.add('products__head');
    showCartHead(cartHead);
    const productsCartList = document.createElement('div');
    productsCartList.classList.add('products__list');
    // const productCartElement = document.createElement('div');
    // productCartElement.classList.add('product');
    cartFragment.append(cartHead);
    const cartLocalStorage = getCartFromLocalStorage();
    if (cartLocalStorage.length === 0) {
        showEmptyCart(productsCartList);
    } else {
        productsCartList.innerHTML = getCartListCode(cartLocalStorage);
    }
    cartFragment.append(productsCartList);
    main.appendChild(cartFragment);
}

function hideMainPage(): void {
    const main = <HTMLElement>document.querySelector('.main');
    main.classList.add('cart-block');
    const productsSection = <HTMLElement>document.querySelector('.product-section');
    const sidebar = <HTMLElement>document.querySelector('.sidebar');
    productsSection.classList.add('none');
    sidebar.classList.add('none');
}

function showCartHead(element: HTMLElement): void {
    element.innerHTML = `<h1 class="products__title">
                            Products in cart
                        </h1>
                        <div class="quantity">
                            <div class="quantity__name">
                            Items:
                            </div>
                            <input class="products__input quantity__input" type="number" value="3">
                        </div>
                        <div class="pages">
                            <div class="pages__name">
                            Page:
                            </div>
                            <div class="pages__controls">
                            <div class="pages__arrow">
                                <img src="../../assets/large-arrow.svg" alt="navigate arrow">
                            </div>
                            <input type="number" class="products__input pages__input" value="1" controls="false">
                            <div class="pages__arrow">
                                <img src="../../assets/large-arrow.svg" alt="navigate arrow">
                            </div>
                            </div>
                        </div>`;
}
function showEmptyCart(parentNode: HTMLElement): void {
    parentNode.innerHTML = `<div class="empty-cart">
                                <div class="cart-image"></div>
                                <h3>You cart is empty</h3>
                                <p>Looks like you have not added anything to your cart</p>
                            </div>`;
}

function getCartListCode(cartLocalStorage: CartData[]): string {
    let productCartElInner = '';
    cartLocalStorage.forEach(({ id, amount }, ind) => {
        const {
            title,
            description,
            category,
            stock,
            brand,
            discountPercentage,
            price,
            rating,
            thumbnail,
        } = data.products[id - 1];
        productCartElInner += `<div class="product">
                                <div class="product__number">
                                    ${ind + 1}
                                </div>
                                <div class="product__img">
                                    <img src="${thumbnail}" alt="product photo">
                                </div>
                                <div class="product__descr">
                                    <div class="product__name">
                                        ${title}
                                    </div>
                                    <div class="product__short-descr">
                                        ${description}
                                    </div>
                                    <div class="product__details">
                                        <div class="product__meta-wrapper">
                                            <div class="product__meta-name">
                                                Category:
                                            </div>
                                            <div class="product__meta-value">
                                            ${category}
                                            </div>
                                        </div>
                                        <div class="product__meta-wrapper">
                                            <div class="product__meta-name">
                                                Stock:
                                            </div>
                                            <div class="product__meta-value">
                                            ${stock}
                                            </div>
                                        </div>
                                        <div class="product__meta-wrapper">
                                            <div class="product__meta-name">
                                                Brand:
                                            </div>
                                            <div class="product__meta-value">
                                                ${brand}
                                            </div>
                                        </div>
                                        <div class="product__meta-wrapper">
                                            <div class="product__meta-name">
                                                Discount:  
                                            </div>
                                            <div class="product__meta-value product__meta-value_discount">
                                                ${discountPercentage}%
                                            </div>
                                        </div>
                                        <div class="product__rating">
                                            <div class="product__meta-name">
                                                Rating:  
                                            </div>
                                            <div class="product__meta-value">
                                                ${rating}/5
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="product__amount">
                                    <div class="product__price money">
                                        ${price}
                                    </div>
                                    <div class="product__amount-toggler">
                                        <img src="../assets/minus.svg" alt="minus" class="product__plus">
                                        <input type="number" class="products__input product__input" value="${amount}">
                                        <img src="../assets/plus.svg" alt="plus" class="product__plus">
                                    </div>
                                </div>                                
                            </div>`;
    });
    return productCartElInner;
}

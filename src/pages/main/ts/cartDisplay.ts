import '../style/cart.scss';
import { displayBreadcrumbsCart } from './breadcrumbsDisplay';
import { getSingleParamFromLocalStorage, getCartFromLocalStorage, getTotalCartSum } from './getLocalStorageParams';
import data from '../../../assets/products.json';
import { CartData } from './type';
import {
    setCartDataToLocalStorage,
    setCartAmountToLocalStorage,
    setAmountProductsOnPageToLocalstorage,
    setNumberOfPageToLocalStorage,
} from './setLocalStorageParams';
import { setQueryParams } from './setQueryParams';
import promocode from './promocode';
import modal from './modal';

export function listenHeaderCart(): void {
    const headerCartElement = document.querySelector('.cart');
    headerCartElement?.addEventListener('click', displayCart);
}

function displayCart() {
    const headerCartIcon = document.querySelector('.cart');
    headerCartIcon?.removeEventListener('click', displayCart);
    hideMainPage();
    displayBreadcrumbsCart();
    const main = <HTMLElement>document.querySelector('.main');
    const cartLocalStorage = getCartFromLocalStorage();
    main.classList.add('cart-block');
    const cartFragment = <DocumentFragment>document.createDocumentFragment();
    const cartHead = document.createElement('div');
    cartHead.classList.add('products__head');
    showCartHead(cartHead);
    const wrapper = <HTMLElement>document.createElement('div');
    wrapper.classList.add('product-cart__wrapper');
    cartFragment.append(cartHead, wrapper);
    if (cartLocalStorage.length === 0) {
        main.appendChild(cartFragment);
        showEmptyCart(wrapper);
    } else {
        const summaryBlock = document.createElement('aside');
        summaryBlock.classList.add('summary');
        showSummaryCart(summaryBlock);
        const productsCartList = document.createElement('div');
        productsCartList.classList.add('products__list');
        wrapper.append(productsCartList, summaryBlock);
        main.appendChild(cartFragment);
        showCartListCode();
        listenCartBlock();
    }
    toggleArrowStyle();
    promocode();
    modal();
}

function hideMainPage(): void {
    if (document.querySelector('.sidebar')) {
        const productsSection = <HTMLElement>document.querySelector('.product-section');
        const sidebar = <HTMLElement>document.querySelector('.sidebar');
        productsSection.classList.add('none');
        sidebar.classList.add('none');
    }
}

function showCartHead(element: HTMLElement): void {
    const { countPages, amountProductsOnPage, amountProductsInCart, page } = getPagesParamFromLocalStorage();
    setQueryParams('page', page.toString());
    const quantityInput = amountProductsOnPage ? amountProductsOnPage : amountProductsInCart;
    element.innerHTML = `<h1 class="products__title">
                            Products in cart
                        </h1>
                        <div class="quantity">
                            <div class="quantity__name">
                            Items:
                            </div>
                            <input class="products__input quantity__input" type="number" value="${quantityInput}">
                            <div class="all-products-name"> from <span class="all-products">${amountProductsInCart}</span>
                        </div>
                        <div class="pages">
                            <div class="pages__name">
                            Page:
                            </div>
                            <div class="pages__controls">
                                <div class="pages__arrow navigate" data-left>
                                   <!-- <img src="../../assets/large-arrow.svg" alt="navigate arrow" class="navigate" > -->
                                </div>
                                <input type="number" class="products__input pages__input" value="${page}" controls="false">
                                <div class="pages__arrow  navigate" data-right>
                                   <!-- <img src="../../assets/large-arrow.svg" alt="navigate arrow" class="navigate" data-right> -->
                                </div>
                            </div>
                            <div class="all-pages">
                             from <span class="all-pages-value"> ${countPages}</span>
                             </div>
                        </div>`;
}
function showSummaryCart(element: HTMLElement) {
    const allAmount = getSingleParamFromLocalStorage('all-amount');
    const totalSum = getTotalCartSum();
    element.innerHTML = `<div class="summary__title">
                            Summary
                        </div>
                        <div class="summary__products">
                            <div class="summary__products-title">
                                Products
                            </div>
                            <div class="summary__products-amount">
                                ${allAmount}
                            </div>
                        </div>
                        <div class="summary__total">
                            <div class="summary__total-title">
                                Total:
                            </div>
                            <div class="summary__total-amount money">
                                ${totalSum}
                            </div>
                        </div>
                        <input type="text" class="summary__input" placeholder="Enter promo code">
                        <div class="summary__promo">
                            Promo for test: 'RS', 'EPM'
                        </div>
                        <button class="summary__btn">Buy Now</button>`;
}
export function showEmptyCart(parentNode: HTMLElement): void {
    const summaryBlock = document.querySelector('.summary');
    summaryBlock?.classList.add('none');
    parentNode.innerHTML = `<div class="empty-cart">
                                <div class="cart-image"></div>
                                <h3>You cart is empty</h3>
                                <p>Looks like you have not added anything to your cart</p>
                                <button class="home-btn">Go shopping</button>
                            </div>`;
    const quantityBlock = document.querySelector('.quantity');
    quantityBlock?.classList.add('none');
}

function showCartListCode(): void {
    updatePageValue();
    const cartLocalStorage = <CartData[]>getCartFromLocalStorage();
    const productsCartList = <HTMLElement>document.querySelector('.products__list');
    productsCartList.innerHTML = '';
    const { countPages, amountProductsOnPage, page } = getPagesParamFromLocalStorage();

    let start = 0;
    let finish = 0;
    let currentPage = page;
    if (page > countPages) {
        currentPage = countPages;
        setNumberOfPageToLocalStorage(currentPage);
        updatePageValue();
    }
    start = amountProductsOnPage * currentPage - amountProductsOnPage;
    finish = amountProductsOnPage * currentPage;
    let productCartElInner = '';
    for (let i = start; i < finish && i < cartLocalStorage.length; i++) {
        const { id, amount } = cartLocalStorage[i];
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
        productCartElInner += `<div class="product" data-id="${id}">
                                <div class="product__number">
                                    ${i + 1}
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
                                    <div class="product__amount-toggler"  data-id="${id}" >
                                        <img src="../assets/minus.svg" alt="minus" class="product__plus" data-minus>
                                        <input type="number" class="products__input product__input" value="${amount}">
                                        <img src="../assets/plus.svg" alt="plus" class="product__plus" data-plus>
                                    </div>
                                </div>                                
                            </div>`;
    }
    productsCartList.innerHTML = productCartElInner;
}

function listenCartBlock(): void {
    const headerCartAmount = <HTMLElement>document.querySelector('.cart__amount');
    const cartBlock = <HTMLElement>document.querySelector('.cart-block');
    const cartData: CartData[] = getCartFromLocalStorage();
    const summaryAmount = <HTMLElement>document.querySelector('.summary__products-amount');
    let allAmount: number = getSingleParamFromLocalStorage('all-amount');
    const amountProductsOnPage = <HTMLInputElement>document.querySelector('.quantity__input');
    const pageInput = <HTMLInputElement>document.querySelector('.pages__input');
    if (cartData.length > 0) {
        cartBlock.addEventListener('click', (event: MouseEvent) => {
            const totalSum = <HTMLElement>document.querySelector('.summary__total-amount');
            const headerTotalSum = <HTMLElement>document.querySelector('.cart-total__sum');
            const target = <HTMLElement>event.target;
            if (target.className === 'product__plus' || target.className === 'product__minus') {
                const currentProduct = <HTMLElement>target.closest('.product__amount-toggler');
                const currentInput = <HTMLInputElement>currentProduct.childNodes[3];
                const currentId = Number(<string>currentProduct.dataset.id);
                for (let i = 0; i < cartData.length; i++) {
                    const { id } = cartData[i];
                    let { amount } = cartData[i];
                    if (id === currentId && 'minus' in target.dataset) {
                        amount -= 1;
                        allAmount -= 1;
                        cartData[i].amount = amount;
                        headerCartAmount.textContent = allAmount.toString();
                        summaryAmount.textContent = allAmount.toString();
                        currentInput.value = amount.toString();
                        setCartDataToLocalStorage(cartData);
                        setCartAmountToLocalStorage(allAmount);
                        headerTotalSum.textContent = totalSum.textContent = getTotalCartSum().toString();
                        if (amount === 0) {
                            const productElement = <HTMLElement>target.closest('.product');
                            productElement.remove();
                            showCartListCode();
                            break;
                        }
                        break;
                    } else if (id === currentId && 'plus' in target.dataset) {
                        amount += 1;
                        allAmount += 1;
                        cartData[i].amount = amount;
                        headerCartAmount.textContent = allAmount.toString();
                        summaryAmount.textContent = allAmount.toString();
                        currentInput.value = amount.toString();
                        setCartDataToLocalStorage(cartData);
                        setCartAmountToLocalStorage(allAmount);
                        headerTotalSum.textContent = totalSum.textContent = getTotalCartSum().toString();
                        break;
                    }
                }
            }
            if ('left' in target.dataset) {
                let { page } = getPagesParamFromLocalStorage();
                if (page > 1) {
                    page -= 1;
                    pageInput.value = page.toString();
                    setNumberOfPageToLocalStorage(page);
                    showCartListCode();
                    toggleArrowStyle();
                }
            }
            if ('right' in target.dataset) {
                let { page } = getPagesParamFromLocalStorage();
                const { countPages } = getPagesParamFromLocalStorage();
                if (page < countPages) {
                    page += 1;
                    pageInput.value = page.toString();
                    setNumberOfPageToLocalStorage(page);
                    showCartListCode();
                    toggleArrowStyle();
                }
            }
        });
        amountProductsOnPage?.addEventListener('change', () => {
            setAmountProductsOnPageToLocalstorage(Number(amountProductsOnPage.value));
            showCartListCode();
            toggleArrowStyle();
        });
    }
}
interface PageParams {
    countPages: number;
    amountProductsOnPage: number;
    amountProductsInCart: number;
    page: number;
}
function getPagesParamFromLocalStorage(): PageParams {
    const amountProductsOnPage = getSingleParamFromLocalStorage('cart-page');
    const cartData = getCartFromLocalStorage();
    const amountProductsInCart = cartData.length;
    const countPages = Math.ceil(amountProductsInCart / amountProductsOnPage);
    const page = getSingleParamFromLocalStorage('page-number');
    return {
        countPages: countPages,
        amountProductsOnPage: amountProductsOnPage,
        amountProductsInCart: amountProductsInCart,
        page: page,
    };
}
export function updatePageValue() {
    const { page, countPages, amountProductsInCart } = getPagesParamFromLocalStorage();
    const inputElement = <HTMLInputElement>document.querySelector('.pages__input');
    inputElement.value = page.toString();
    const allPages = <HTMLElement>document.querySelector('.all-pages-value');
    allPages.textContent = countPages.toString();
    const allProducts = <HTMLElement>document.querySelector('.all-products');
    allProducts.textContent = amountProductsInCart.toString();
}
function toggleArrowStyle() {
    const { countPages, page } = getPagesParamFromLocalStorage();
    const navigateArrow: NodeListOf<Element> = document.querySelectorAll('.navigate');
    if (page === 1 && countPages === 1) {
        navigateArrow[0].classList.add('non-active');
        navigateArrow[1].classList.add('non-active');
    } else if (page === 1) {
        navigateArrow[0].classList.add('non-active');
        navigateArrow[1].classList.remove('non-active');
    } else if (page === countPages) {
        navigateArrow[0].classList.remove('non-active');
        navigateArrow[1].classList.add('non-active');
    } else {
        navigateArrow.forEach((el) => el.classList.remove('non-active'));
    }
}

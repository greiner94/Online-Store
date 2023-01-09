import '../style/cart.scss';
import homeIcon from '../../../assets/img/home_icon.svg';
import minusIcon from '../../../assets/img/minus.svg';
import plusIcon from '../../../assets/img/plus.svg';
import { getSingleParamFromLocalStorage, getCartFromLocalStorage, getTotalCartSum } from './getLocalStorageParams';
import data from '../../../assets/products.json';
import { CartData, PageParams } from './type';
import {
    setCartDataToLocalStorage,
    setAmountProductsOnPageToLocalstorage,
    setNumberOfPageToLocalStorage,
    setCartAllAmount,
} from './setLocalStorageParams';
import { setQueryParams } from './setQueryParams';
import { promocode } from './promocode';
import { modal } from './modal';
import redirectToMain from './redirectToMain';

export function listenHeaderCart(): void {
    const headerCartElement = document.querySelector('.cart');
    headerCartElement?.addEventListener('click', displayCart);
}

function displayCart() {
    const cartLocalStorage: CartData[] = getCartFromLocalStorage();
    const main = <HTMLElement>document.querySelector('.main');
    const cartFragment = <DocumentFragment>document.createDocumentFragment();
    const newMain = <HTMLElement>document.createElement('main');
    const cartHead = document.createElement('div');
    const wrapper = <HTMLElement>document.createElement('div');
    newMain.className = 'main cart-block';
    cartHead.className = 'products__head';
    wrapper.className = 'product-cart__wrapper';
    displayBreadcrumbsCart(newMain);
    showCartHead(cartHead);
    cartFragment.append(cartHead, wrapper);
    if (cartLocalStorage.length === 0) {
        main.after(newMain);
        main.remove();
        newMain.appendChild(cartFragment);
        showEmptyCart();
    } else {
        const summaryBlock = document.createElement('aside');
        summaryBlock.classList.add('summary');
        showSummaryCart(summaryBlock);
        const productsCartList = document.createElement('div');
        productsCartList.classList.add('products__list');
        wrapper.append(productsCartList, summaryBlock);
        main.after(newMain);
        main.remove();
        newMain.appendChild(cartFragment);
        showCartListCode();
        listenCartBlock();
    }
    toggleArrowStyle();
    promocode();
    modal();
    redirectToMain('.breadcrumbs__home');
    redirectToMain('.home-btn');
    const headerCartIcon = document.querySelector('.cart');
    headerCartIcon?.removeEventListener('click', displayCart);
}
function displayBreadcrumbsCart(element: HTMLElement): void {
    const breadcrumbsFragment: DocumentFragment = document.createDocumentFragment();
    const navBreadcrumbs: HTMLElement = document.createElement('nav');
    navBreadcrumbs.classList.add('breadcrumbs');
    navBreadcrumbs.innerHTML = ` <span class="breadcrumbs__home">
                                    <img src="${homeIcon}" alt="home icon">
                                </span>
                                <span class="breadcrumbs__item">
                                    Cart
                                </span>`;
    breadcrumbsFragment.append(navBreadcrumbs);
    element.append(breadcrumbsFragment);
}

function showCartHead(element: HTMLElement): void {
    const { countPages, amountProductsOnPage, amountProductsInCart } = getPagesParamFromLocalStorage();
    let { page } = getPagesParamFromLocalStorage();
    page = page === 0 ? 1 : page;
    setQueryParams('page', page.toString());
    setNumberOfPageToLocalStorage(page);
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
                                </div>
                                <input type="number" class="products__input pages__input" value="${page}" controls="false">
                                <div class="pages__arrow  navigate" data-right>
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
export function showEmptyCart(): void {
    const wrapper = <HTMLElement>document.querySelector('.product-cart__wrapper');
    const summaryBlock = document.querySelector('.summary');
    summaryBlock?.classList.add('none');
    wrapper.innerHTML = `<div class="empty-cart">
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
    console.log('rendering product cart list');
    const cartLocalStorage: CartData[] = getCartFromLocalStorage();
    console.log('cartLocalStorage', cartLocalStorage);
    const productsCartList = <HTMLElement>document.querySelector('.products__list');
    console.log('cartLocalStorage', cartLocalStorage);
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
    console.log('start', start);
    console.log('finish', finish);
    console.log('amountProductsOnPage', amountProductsOnPage);
    console.log('currentPage', currentPage);
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
                                    <div class="product__price money" data-price = "${price}" data-id="${id}">
                                        ${price * amount}
                                    </div>
                                    <div class="product__amount-toggler"  data-id="${id}" >
                                        <img src="${minusIcon}" alt="minus" class="product__plus" data-minus>
                                        <input type="number" class="products__input product__input" value="${amount}">
                                        <img src="${plusIcon}" alt="plus" class="product__plus" data-plus>
                                    </div>
                                </div>                                
                            </div>`;
    }
    productsCartList.innerHTML = productCartElInner;
    console.log('productCartElInner', productCartElInner);
}

function listenCartBlock(): void {
    const cartBlock = <HTMLElement>document.querySelector('.cart-block');
    const amountProductsOnPage = <HTMLInputElement>document.querySelector('.quantity__input');
    const pageInput = <HTMLInputElement>document.querySelector('.pages__input');
    const cartData: CartData[] = getCartFromLocalStorage();
    const { countPages } = getPagesParamFromLocalStorage();
    if (cartData.length > 0) {
        cartBlock.addEventListener('click', arrowChangeAmount);
        amountProductsOnPage?.addEventListener('change', () => {
            const allAmount: number = getSingleParamFromLocalStorage('all-amount');
            let value = Number(amountProductsOnPage.value);
            if (isInputValidate(value, allAmount)) {
                setAmountProductsOnPageToLocalstorage(value);
                showCartListCode();
                toggleArrowStyle();
            } else if (value > allAmount) {
                value = allAmount;
                amountProductsOnPage.value = value.toString();
            } else if (value === 0) {
                value = 1;
                amountProductsOnPage.value = value.toString();
            }
        });
        pageInput.addEventListener('change', () => {
            let page = Number(pageInput.value);
            if (!isInputValidate(page, countPages)) {
                page = 1;
                pageInput.value = page.toString();
            }
            refreshPageData(page);
        });
        cartBlock.addEventListener('change', (event: Event) => {
            const target = <HTMLInputElement>event.target;
            if (target.className === 'products__input product__input') {
                const totalSum = <HTMLElement>document.querySelector('.summary__total-amount');
                const headerTotalSum = <HTMLElement>document.querySelector('.cart-total__sum');
                const currentProduct = <HTMLElement>target.closest('.product__amount-toggler');
                const currentId = Number(<string>currentProduct.dataset.id);
                const { stock } = data.products[currentId - 1];
                let currentAmount = Number(target.value);
                const index: number = cartData.findIndex(({ id }) => id === currentId);
                currentAmount = currentAmount > stock ? stock : currentAmount;
                cartData[index].amount = currentAmount;
                setCartDataToLocalStorage(cartData);
                headerTotalSum.textContent = totalSum.textContent = getTotalCartSum().toString();
                setCartAllAmount();
                showCartListCode();
            }
        });
    }
}
export function arrowChangeAmount(event: MouseEvent) {
    const cartData: CartData[] = getCartFromLocalStorage();
    const totalSum = <HTMLElement>document.querySelector('.summary__total-amount');
    const headerTotalSum = <HTMLElement>document.querySelector('.cart-total__sum');
    const pageInput = <HTMLInputElement>document.querySelector('.pages__input');
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
                cartData[i].amount = amount;
                currentInput.value = amount.toString();
                setCartDataToLocalStorage(cartData);
                setCartAllAmount();
                headerTotalSum.textContent = totalSum.textContent = getTotalCartSum().toString();
                if (amount === 0) {
                    const productElement = <HTMLElement>target.closest('.product');
                    productElement.remove();
                    showCartListCode();
                    break;
                }
                const productPrices: NodeListOf<HTMLElement> = document.querySelectorAll('.product__price');
                const currentProductsPrice = Array.from(productPrices).find((el) => {
                    return Number(el.dataset.id) === id;
                }) as HTMLElement;
                const price = Number(currentProductsPrice.dataset.price);
                currentProductsPrice.textContent = (amount * price).toString();
                break;
            } else if (id === currentId && 'plus' in target.dataset) {
                const { stock } = data.products[id - 1];
                amount += 1;
                amount = amount > stock ? stock : amount;
                cartData[i].amount = amount;
                currentInput.value = amount.toString();
                const productPrices: NodeListOf<HTMLElement> = document.querySelectorAll('.product__price');
                const currentProductsPrice = Array.from(productPrices).find((el) => {
                    return Number(el.dataset.id) === id;
                }) as HTMLElement;
                const price = Number(currentProductsPrice.dataset.price);
                currentProductsPrice.textContent = (amount * price).toString();
                setCartDataToLocalStorage(cartData);
                setCartAllAmount();
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
            refreshPageData(page);
        }
    }
    if ('right' in target.dataset) {
        let { page } = getPagesParamFromLocalStorage();
        const { countPages } = getPagesParamFromLocalStorage();
        if (page < countPages) {
            page += 1;
            pageInput.value = page.toString();
            refreshPageData(page);
        }
    }
}
function refreshPageData(page: number) {
    setNumberOfPageToLocalStorage(page);
    showCartListCode();
    toggleArrowStyle();
}
function isInputValidate(value: number, comparedNumber: number): boolean {
    return value > 0 && value <= comparedNumber;
}
function getPagesParamFromLocalStorage(): PageParams {
    const page = getSingleParamFromLocalStorage('page-number');
    const cartData: CartData[] = getCartFromLocalStorage();
    const amountProductsInCart: number = cartData.length;
    const amountProductsOnPage = getSingleParamFromLocalStorage('cart-page') || amountProductsInCart;
    const countPages: number = Math.ceil(amountProductsInCart / amountProductsOnPage);
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
    const allPages = <HTMLElement>document.querySelector('.all-pages-value');
    const allProducts = <HTMLElement>document.querySelector('.all-products');
    inputElement.value = page.toString();
    allPages.textContent = countPages.toString();
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

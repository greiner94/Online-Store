import '../style/cart.scss';
import { displayBreadcrumbsCart } from './breadcrumbsDisplay';
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
    const cartLocalStorage: CartData[] = getCartFromLocalStorage();
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
        showEmptyCart();
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
// function showMainPage(): void {
//     console.log('click btn');
//     const homeButton = <HTMLElement>document.querySelector('.home-btn');
//     homeButton.removeEventListener('click', showMainPage);
//     const main = <HTMLElement>document.querySelector('.main');
//     const productsSection = <HTMLElement>document.querySelector('.product-section');
//     const sidebar = <HTMLElement>document.querySelector('.sidebar');
//     const breadcrumbs = <HTMLElement>document.querySelector('.breadcrumbs');
//     const cartHead = <HTMLElement>document.querySelector('.products__head');
//     const cart = <HTMLElement>document.querySelector('.product-cart__wrapper');
//     main.classList.remove('cart-block');
//     productsSection.classList.remove('none');
//     sidebar.classList.remove('none');
//     breadcrumbs.remove();
//     cartHead.remove();
//     cart.remove();
// }

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
    listenEmptyCart();
}

function showCartListCode(): void {
    updatePageValue();
    const cartLocalStorage: CartData[] = getCartFromLocalStorage();
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
                                    <div class="product__price money" data-price = "${price}" data-id="${id}">
                                        ${price * amount}
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
    const homeButton = <HTMLButtonElement>document.querySelector('.home-btn');
    const cartBlock = <HTMLElement>document.querySelector('.cart-block');
    const amountProductsOnPage = <HTMLInputElement>document.querySelector('.quantity__input');
    const pageInput = <HTMLInputElement>document.querySelector('.pages__input');
    const cartData: CartData[] = getCartFromLocalStorage();
    const { countPages } = getPagesParamFromLocalStorage();
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
        });
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
function listenEmptyCart() {
    const homeButton = <HTMLElement>document.querySelector('.home-btn');
    //homeButton.addEventListener('click', showMainPage);
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
    const amountProductsOnPage = getSingleParamFromLocalStorage('cart-page');
    const page = getSingleParamFromLocalStorage('page-number');
    const cartData: CartData[] = getCartFromLocalStorage();
    const amountProductsInCart: number = cartData.length;
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

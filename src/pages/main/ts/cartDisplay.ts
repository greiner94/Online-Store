import '../style/cart.scss';
import { displayBreadcrumbs } from './breadcrumbsDisplay';
import { getCartAmountFromLocalStorage, getCartFromLocalStorage, getTotalCartSum } from './getLocalStorageParams';
import data from '../../../assets/products.json';
import { CartData } from './type';
import { setCartDataToLocalStorage, setCartAmountToLocalStorage } from './setLocalStorageParams';

export function listenHeaderCart(): void {
    const headerCartElement = document.querySelector('.cart');
    headerCartElement?.addEventListener('click', displayCart);
}

function displayCart() {
    const headerCartIcon = document.querySelector('.cart');
    headerCartIcon?.removeEventListener('click', displayCart);
    hideMainPage();
    displayBreadcrumbs();
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
        productsCartList.innerHTML = getCartListCode(cartLocalStorage);
        wrapper.append(productsCartList, summaryBlock);
        main.appendChild(cartFragment);
        listenCartBlock();
    }
}

function hideMainPage(): void {
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
function showSummaryCart(element: HTMLElement) {
    const allAmount = getCartAmountFromLocalStorage();
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
                                    <div class="product__amount-toggler"  data-id="${id}" >
                                        <img src="../assets/minus.svg" alt="minus" class="product__plus" data-minus>
                                        <input type="number" class="products__input product__input" value="${amount}">
                                        <img src="../assets/plus.svg" alt="plus" class="product__plus" data-plus>
                                    </div>
                                </div>                                
                            </div>`;
    });
    return productCartElInner;
}

function listenCartBlock(): void {
    const cartProductsItems: NodeListOf<Element> = document.querySelectorAll('.product');
    const headerCartAmount = <HTMLElement>document.querySelector('.cart__amount');
    const cartBlock = <HTMLElement>document.querySelector('.cart-block');
    const cartData: CartData[] = getCartFromLocalStorage();
    const summaryAmount = <HTMLElement>document.querySelector('.summary__products-amount');
    let allAmount: number = getCartAmountFromLocalStorage();
    if (cartData.length > 0) {
        cartBlock.addEventListener('click', (event: MouseEvent) => {
            const totalSum = <HTMLElement>document.querySelector('.summary__total-amount');
            const headerTotalSum = <HTMLElement>document.querySelector('.cart-total__sum');
            const target = <HTMLElement>event.target;
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
                        cartProductsItems[i].remove();
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
        });
    }
}

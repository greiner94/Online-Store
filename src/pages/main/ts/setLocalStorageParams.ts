import { CartData } from './type';
import { showEmptyCart } from './cartDisplay';
import { setQueryParams } from './setQueryParams';
import { getCartFromLocalStorage } from './getLocalStorageParams';
export function setCartDataToLocalStorage(newCartData: CartData[]): void {
    const cartDataWithoutZeroAmount = newCartData.filter(({ amount }) => amount !== 0);
    const newCartDataJson: string = JSON.stringify(cartDataWithoutZeroAmount);
    localStorage.setItem('cart', newCartDataJson);
}

export function setAmountProductsOnPageToLocalstorage(newAmountProducts: number): void {
    const localProp = 'cart-page';
    const newAmountProductsJson: string = JSON.stringify(newAmountProducts);
    localStorage.setItem(localProp, newAmountProductsJson);
}

export function setNumberOfPageToLocalStorage(page: number): void {
    const localProp = 'page-number';
    if (page === 0) {
        localStorage.removeItem(localProp);
    } else {
        localStorage.setItem(localProp, page.toString());
        setQueryParams('page', page.toString());
    }
}
export function setCartAllAmount(): void {
    const cartData: CartData[] = getCartFromLocalStorage();
    const allAmount: number = cartData.reduce((acc, { amount }) => acc + amount, 0);
    const localProp = 'all-amount';
    localStorage.setItem(localProp, allAmount.toString());
    showAllAmount(allAmount);
    if (allAmount === 0) {
        localStorage.removeItem(localProp);
        showEmptyCart();
    }
}
function showAllAmount(allAmount: number): void {
    const headerCartAmount = <HTMLElement>document.querySelector('.cart__amount');
    const summaryAmount = <HTMLElement>document.querySelector('.summary__products-amount');
    headerCartAmount.textContent = summaryAmount.textContent = allAmount.toString();
}

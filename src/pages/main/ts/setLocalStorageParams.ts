import { CartData } from './type';
import { showEmptyCart } from './cartDisplay';
import { setQueryParams } from './setQueryParams';
export function setCartDataToLocalStorage(newCartData: CartData[]): void {
    const cartDataWithoutZeroAmount = newCartData.filter(({ amount }) => amount !== 0);
    const newCartDataJson: string = JSON.stringify(cartDataWithoutZeroAmount);
    localStorage.setItem('cart', newCartDataJson);
}

export function setCartAmountToLocalStorage(newAmount: number): void {
    const wrapper = <HTMLElement>document.querySelector('.product-cart__wrapper');
    const localProp = 'all-amount';
    if (newAmount > 0) {
        const newAmountJson: string = JSON.stringify(newAmount);
        localStorage.setItem(localProp, newAmountJson);
    } else {
        localStorage.removeItem(localProp);
        showEmptyCart(wrapper);
    }
}

export function setAmountProductsOnPageToLocalstorage(newAmountProducts: number): void {
    const localProp = 'cart-page';
    const newAmountProductsJson: string = JSON.stringify(newAmountProducts);
    localStorage.setItem(localProp, newAmountProductsJson);
}

export function setNumberOfPageToLocalStorage(page: number): void {
    const localProp = 'page-number';
    localStorage.setItem(localProp, page.toString());
    setQueryParams('page', page.toString());
}

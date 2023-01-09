import { addQueryParamsToLocalStorage } from './setQueryParams';
import { switchMode } from './switchMode';
import { displayHeaderCartAmount } from './addToCart';
import { getTotalCartSum } from './getLocalStorageParams';
import { CartData } from './type';
import { setAmountProductsOnPageToLocalstorage } from './setLocalStorageParams';
/**
 * Need change. Add parameters for load page
 */
export function windowOnload(): void {
    addQueryParamsToLocalStorage();
    window.addEventListener('popstate', () => {
        addQueryParamsToLocalStorage();
    });
    document.addEventListener('DOMContentLoaded', () => {
        changePageWithQueryParams();
        changePageWithOtherParams();
    });
}

export function changePageWithQueryParams(): void {
    const localProp = 'query';
    const queryParams = JSON.parse(<string>localStorage.getItem(localProp));
    for (const key in queryParams) {
        if (key === 'mode') {
            const value = <string>queryParams[key];
            switchMode<string>(value);
        }
    }
}

function changePageWithOtherParams(): void {
    const headerTotalSum = <HTMLElement>document.querySelector('.cart-total__sum');
    const localProp = 'cart';
    const cartData: CartData[] = JSON.parse(localStorage.getItem(localProp) || '[]');
    const allAmount = cartData.reduce((acc, { amount }) => acc + amount, 0);
    displayHeaderCartAmount(allAmount);
    setAmountProductsOnPageToLocalstorage(allAmount);
    headerTotalSum.textContent = getTotalCartSum().toString();
}

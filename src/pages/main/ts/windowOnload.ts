import { addQueryParamsToLocalStorage } from './setQueryParams';
import { switchMode } from './switchMode';
import { displayHeaderCartAmount } from './addToCart';
import { getTotalCartSum } from './getLocalStorageParams';
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

function changePageWithQueryParams(): void {
    const localProp = 'query';
    const queryParams = JSON.parse(<string>localStorage.getItem(localProp));
    for (const key in queryParams) {
        // Add parameter to this place: if (key === 'brand') than call your function
        if (key === 'mode') {
            const value = <string>queryParams[key];
            switchMode<string>(value);
        }
    }
}

function changePageWithOtherParams(): void {
    const localPropCartAllAmount = 'all-amount';
    const allAmount = Number(<string>localStorage.getItem(localPropCartAllAmount));
    displayHeaderCartAmount(allAmount);
    const headerTotalSum = <HTMLElement>document.querySelector('.cart-total__sum');
    headerTotalSum.textContent = getTotalCartSum().toString();
}

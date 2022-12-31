import { QueryParams, CartData } from './type';

export function getQueryParams(): QueryParams {
    const localProp = 'query';
    const queryParams: QueryParams = JSON.parse(localStorage.getItem(localProp) || '{}');
    return queryParams;
}

export function getClassMode(): string {
    const queryParams: QueryParams = getQueryParams();
    return queryParams.mode ? <string>queryParams.mode : 'cards';
}

export function getCartFromLocalStorage(): CartData[] {
    const localPropCart = 'cart';
    return JSON.parse(localStorage.getItem(localPropCart) || '[]');
}

// export function getCartAmountFromLocalStorage(): number {
//     const localPropCart = 'all-amount';
//     return JSON.parse(localStorage.getItem(localPropCart) || '0');
// }

export function getTotalCartSum(): number {
    const cartData = getCartFromLocalStorage();
    let totalSum = 0;
    cartData.forEach(({ amount, price }) => {
        totalSum += amount * price;
    });
    return totalSum;
}

export function getSingleParamFromLocalStorage(localProp: string): number {
    return Number(localStorage.getItem(localProp) || '0');
}

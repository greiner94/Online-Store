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

export function getTotalCartSum(): number {
    const cartData: CartData[] = getCartFromLocalStorage();
    return cartData.reduce((acc, { amount, price }) => acc + amount * price, 0);
}

export function getSingleParamFromLocalStorage(localProp: string): number {
    return Number(localStorage.getItem(localProp) || '0');
}

export interface QueryParams {
    [key: string]: string | string[];
}
export interface CartData {
    id: number;
    amount: number;
    price: number;
}
export interface PageParams {
    countPages: number;
    amountProductsOnPage: number;
    amountProductsInCart: number;
    page: number;
}

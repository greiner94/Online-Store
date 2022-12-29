import { CartData } from './type';
import { showEmptyCart } from './cartDisplay';
export function setCartDataToLocalStorage(newCartData: CartData[]): void {
    const cartDataWithoutZeroAmount = newCartData.filter(({ amount }) => amount !== 0);
    const newCartDataJson: string = JSON.stringify(cartDataWithoutZeroAmount);
    localStorage.setItem('cart', newCartDataJson);
}
export function setCartAmountToLocalStorage(newAmount: number): void {
    const productsCartList = <HTMLElement>document.querySelector('.products__list');
    const localProp = 'all-amount';
    if (newAmount > 0) {
        const newAmountJson: string = JSON.stringify(newAmount);
        localStorage.setItem(localProp, newAmountJson);
    } else {
        localStorage.removeItem(localProp);
        showEmptyCart(productsCartList);
    }
}

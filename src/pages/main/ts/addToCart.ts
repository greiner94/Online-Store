import { CartData } from './type';
export function listenAddCart(): void {
    const cartIcons: NodeListOf<HTMLElement> = document.querySelectorAll('.add-cart');
    cartIcons.forEach((el, ind) => {
        el.addEventListener('click', (event) => {
            const cart = event.target as HTMLElement;
            const productId = Number(cart.dataset.id);
            const productPrice = Number(cart.dataset.price);
            const localProp = 'cart';
            const localProp2 = 'all-amount';
            let cartAmountAll = Number(JSON.parse(localStorage.getItem(localProp2) || '0'));
            const cartData: CartData[] = JSON.parse(localStorage.getItem(localProp) || '[]');
            const newCartData = cartData.filter(({ id }) => {
                return Number(id) !== productId;
            });
            if (cartData.length === newCartData.length) {
                newCartData.push({
                    id: productId,
                    amount: 1,
                    price: productPrice,
                });
                toggleIconCart(ind, true);
                cartAmountAll += 1;
            } else if (newCartData.length < cartData.length) {
                cartAmountAll -= 1;
                toggleIconCart(ind, false);
            }
            displayHeaderCartAmount(cartAmountAll);
            const valueJson = JSON.stringify(newCartData);
            localStorage.setItem(localProp, valueJson);
            localStorage.setItem(localProp2, `${cartAmountAll}`);
        });
    });
}
/**
 *
 * @param index  index of cart icon when need to show add product
 * @param isAddToCart if product added use true, if canceled adding - false
 */
function toggleIconCart(index: number, isAddToCart: boolean): void {
    const cartIcons: NodeListOf<HTMLElement> = document.querySelectorAll('.add-cart');
    const el = cartIcons[index];
    if (!isAddToCart) {
        el.classList.remove('add');
    } else {
        el.classList.add('add');
    }
}

export function displayHeaderCartAmount(allCartAmount: number): void {
    const headerCartAmount = <HTMLElement>document.querySelector('.cart__amount');
    headerCartAmount.textContent = `${allCartAmount}` || '0';
}

export function checkAddingCart(currentId: number): boolean {
    const localProp = 'cart';
    const cartData: CartData[] = JSON.parse(localStorage.getItem(localProp) || '[]');
    const indexOfCartElement = Array.from(cartData).findIndex(({ id }) => Number(id) === currentId);
    return indexOfCartElement !== -1;
}

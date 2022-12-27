import { CartData } from './type';
export function addCart(): void {
    const cartIcons: NodeListOf<HTMLElement> = document.querySelectorAll('.add-cart');
    cartIcons.forEach((el, ind) => {
        el.addEventListener('click', (event) => {
            console.log('event', event.target);
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
                cartAmountAll += 1;
            } else if (newCartData.length < cartData.length) {
                cartAmountAll -= 1;
            }
            toggleIconCart(ind);
            displayHeaderCartAmount(cartAmountAll);
            const valueJson = JSON.stringify(newCartData);
            localStorage.setItem(localProp, valueJson);
            localStorage.setItem(localProp2, `${cartAmountAll}`);
        });
    });
}

function toggleIconCart(index: number): void {
    const cartIcons: NodeListOf<HTMLElement> = document.querySelectorAll('.add-cart');
    const el = cartIcons[index];
    if (el.classList.contains('add')) {
        el.classList.remove('add');
    } else {
        el.classList.add('add');
    }
}

function displayHeaderCartAmount(allCartAmount: number): void {
    const headerCartAmount = <HTMLElement>document.querySelector('.cart__amount');
    headerCartAmount.textContent = `${allCartAmount}` || '0';
}

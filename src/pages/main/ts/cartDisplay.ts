import '../style/cart.scss';
const main = <HTMLElement>document.querySelector('.main');

const breadcrumbsFragment: DocumentFragment = document.createDocumentFragment();
const productCart = <HTMLElement>document.createElement('div');
productCart.classList.add('product-cart');
const nav = <HTMLElement>document.createElement('nav');
nav.classList.add('breadcrumbs');

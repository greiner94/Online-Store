import '../index.html';
import '../style/style.scss';
import '../../../assets/ts/template';

import data from '../../../assets/products.json';
import { windowOnload } from './windowOnload';
import categoryFilter from './categoryFilter';
import brandFilter from './brandFilter';
import priceFilter from './priceFilter';
import stockFilter from './stockFilter';
import renderProuductsCards from './renderProuductsCards';
import { listenSwitchingMode } from './switchMode';
import { queryReset, querySave } from './queryResetSave';
import { headerImplement } from './headerImplement';
import sorting from './sorting';
import search from './search';
import indicationSelectedProducts from './indicationSelectedProducts';
import productPage from './productPage';
import { renderMainPage } from './main';
import redirectToMain from './redirectToMain';

window.addEventListener('popstate', async () => {
    const url = new URL(window.location.href);
    const searchParams = <URLSearchParams>url.searchParams;
    if (!searchParams.get('product') && !searchParams.get('cart')) {
        const html = await fetch('./index.html').then((data) => data.text());
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const productPageElem = (document.querySelector('.product-page') ||
            document.querySelector('.main')) as HTMLElement;
        productPageElem.insertAdjacentElement('afterend', doc.querySelector('.main') as HTMLElement);
        productPageElem.remove();
        mainPage();
    }
});

redirectToMain('.footer__title a');
redirectToMain('.shop-name');

export function mainPage() {
    renderMainPage();
headerImplement();
    // const productsList = data.products;
    // renderProuductsCards(productsList);
    // queryReset();
    // querySave();
    // windowOnload();
    // categoryFilter();
    // brandFilter();
    //priceFilter();
    //stockFilter();
    // listenSwitchingMode();
    // sorting();
    // search();
    // indicationSelectedProducts();
    //productPage();
}
mainPage();

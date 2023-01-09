import '../index.html';
import '../style/style.scss';
import '../../../assets/ts/template';

import { windowOnload } from './windowOnload';
import { headerImplement } from './headerImplement';
import { renderMainPage } from './main';
import redirectToMain from './redirectToMain';
import brandFilter from './brandFilter';
import categoryFilter from './categoryFilter';
import search from './search';
import priceFilter from './priceFilter';
import stockFilter from './stockFilter';
import sorting from './sorting';
import renderProuductsCards from './renderProuductsCards';
import data from '../../../assets/products.json';
import { queryReset, querySave } from './queryResetSave';
import { changePageWithQueryParams } from './windowOnload';
import { listenSwitchingMode } from './switchMode';
import indicationSelectedProducts from './indicationSelectedProducts';
import { listenHeaderCart } from './cartDisplay';
import productPage from './productPage';
window.addEventListener('popstate', async () => {
    const url = new URL(window.location.href);
    const searchParams = <URLSearchParams>url.searchParams;
    if (!searchParams.get('product') && !searchParams.get('cart')) {
        const productPageElem = document.querySelector('.main') as HTMLElement;
        productPageElem.remove();
        mainPage();
    }
});

redirectToMain('.footer__title a');
redirectToMain('.shop-name');

export function mainPage() {
    renderMainPage();
    headerImplement();
    windowOnload();
    categoryFilter();
    brandFilter();
    priceFilter();
    stockFilter();
    const productsList = data.products;
    renderProuductsCards(productsList);
    queryReset();
    querySave();
    changePageWithQueryParams();
    sorting();
    search();
    indicationSelectedProducts();
    listenSwitchingMode();
    listenHeaderCart();
    productPage();
    window.scrollTo(0, 0);
}
mainPage();

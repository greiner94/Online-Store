import '../index.html';
import '../style/style.scss';
import '../../../assets/ts/template';

import { windowOnload } from './windowOnload';
import { headerImplement } from './headerImplement';
import { renderMainPage } from './main';
import redirectToMain from './redirectToMain';

window.addEventListener('popstate', async () => {
    const url = new URL(window.location.href);
    const searchParams = <URLSearchParams>url.searchParams;
    if (!searchParams.get('product') && !searchParams.get('cart')) {
        const productPageElem = document.querySelector('.main') as HTMLElement;
        productPageElem.remove();
        renderMainPage();
    }
});

redirectToMain('.footer__title a');
redirectToMain('.shop-name');

export function mainPage() {
    renderMainPage();
    headerImplement();
    windowOnload();
}
mainPage();

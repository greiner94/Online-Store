import { mainPage } from '.';

function redirectToMain(selector: string) {
    document.querySelector(selector)?.addEventListener('click', async (e) => {
        e.preventDefault();
        const url = new URL(window.location.href);
        const searchParams = <URLSearchParams>url.searchParams;
        searchParams.delete('product');
        window.history.pushState({}, '', url);
        const html = await fetch('./index.html').then((data) => data.text());
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const productPageElem = (document.querySelector('.product-page') ||
            document.querySelector('.main')) as HTMLElement;
        productPageElem.insertAdjacentElement('afterend', doc.querySelector('.main') as HTMLElement);
        productPageElem.remove();
        mainPage();
    });
}

export default redirectToMain;

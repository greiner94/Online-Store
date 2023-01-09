import { mainPage } from '.';

function redirectToMain(selector: string) {
    document.querySelector(selector)?.addEventListener('click', async (e) => {
        e.preventDefault();
        const url = new URL(window.location.href);
        const searchParams = <URLSearchParams>url.searchParams;
        searchParams.delete('product');
        window.history.pushState({}, '', url);
        const productPageElem = document.querySelector('.main') as HTMLElement;
        productPageElem.remove();
        mainPage();
    });
}

export default redirectToMain;

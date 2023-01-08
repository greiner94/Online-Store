import renderProductPage from './renderProductPage';
import '../../style/product.scss';
import { deleteQueryProductParam } from '../setQueryParams';
import { renderMainPage } from '../main';

function productPage() {
    const cardsWrapper = document.querySelector('.cards-block') as HTMLElement;
    //const breadcrumbsHome = document.querySelector('.breadcrumbs__home');
    const productPage = document.querySelector('.product-page');
    const currUrl = new URL(window.location.href);
    productPage?.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLElement;
        console.log('target', target);
        if (target.closest('.card') && !target.classList.contains('add-cart')) {
            const productId = target.closest('.card')?.querySelector('.add-cart')?.getAttribute('data-id') || '0';
            currUrl.searchParams.set('product', productId);
            window.history.pushState({}, '', currUrl);
            renderProductPage();
        }
    });
    window.addEventListener('popstate', () => {
        if (!searchParams.get('product')) {
            renderProductPage();
        }
    });
    const searchParams = <URLSearchParams>currUrl.searchParams;
    if (searchParams.get('product')) {
        renderProductPage();
    }
    //breadcrumbsHome?.addEventListener('click', showMainPage);
}

function showMainPage() {
    const breadcrumbsHome = document.querySelector('.breadcrumbs__home');
    breadcrumbsHome?.removeEventListener('click', showMainPage);
    const main = <HTMLElement>document.querySelector('.main');
    main.remove();
    deleteQueryProductParam();
    renderMainPage();
}
export default productPage;

import renderProductPage from './renderProductPage';
import '../../style/product.scss';
import { deleteQueryProductParam } from '../setQueryParams';
import { renderMainPage } from '../main';

function productPage() {
    const allWrapper = document.querySelector('.all-wrapper');
    const currUrl = new URL(window.location.href);
    allWrapper?.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLElement;
        console.log('target', target);
        if (target.closest('.card') && !target.classList.contains('add-cart')) {
            const productId = target.closest('.card')?.querySelector('.add-cart')?.getAttribute('data-id') || '0';
            currUrl.searchParams.set('product', productId);
            window.history.pushState({}, '', currUrl);
            renderProductPage();
        }
        if (target.closest('.breadcrumbs__home')) {
            showMainPage();
        }
        if (target.className === 'shop-name' && document.querySelector('.breadcrumbs')) {
            showMainPage();
        }
    });
    window.addEventListener('popstate', () => {
        if (!searchParams.get('product') && !searchParams.get('page')) {
            renderProductPage();
        }
    });
    const searchParams = <URLSearchParams>currUrl.searchParams;
    if (searchParams.get('product')) {
        renderProductPage();
    }
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

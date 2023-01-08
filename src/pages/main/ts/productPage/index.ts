import renderProductPage from './renderProductPage';
import '../../style/product.scss';

function productPage() {
    const cardsWrapper = document.querySelector('.cards-block') as HTMLElement;
    const currUrl = new URL(window.location.href);
    cardsWrapper.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLElement;
        if (target.closest('.card') && !target.classList.contains('add-cart')) {
            const productId = target.closest('.card')?.querySelector('.add-cart')?.getAttribute('data-id') || '0';
            currUrl.searchParams.set('product', productId);
            window.history.pushState({}, '', currUrl);
            renderProductPage();
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

export default productPage;

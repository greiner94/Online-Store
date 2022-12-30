import brandTitleShowing from './brandTitleShowing';
import categoryTitleShowing from './categoryTitleShowing';
import indicateSelectedProducts from './indicateSelectedProducts';

function indicationSelectedProducts() {
    indicateSelectedProducts();
    categoryTitleShowing();
    brandTitleShowing();

    const cardsWrapper = document.querySelector('.cards-block') as HTMLElement;
    const observer = new MutationObserver(() => {
        indicateSelectedProducts();
        categoryTitleShowing();
        brandTitleShowing();
    });
    observer.observe(cardsWrapper, {
        childList: true,
        subtree: true,
        characterDataOldValue: true,
    });
}

export default indicationSelectedProducts;

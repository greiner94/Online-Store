import indicateSelectedProducts from './indicateSelectedProducts';

function indicationSelectedProducts() {
    indicateSelectedProducts();

    const cardsWrapper = document.querySelector('.cards-block') as HTMLElement;
    const observer = new MutationObserver(() => {
        indicateSelectedProducts();
    });
    observer.observe(cardsWrapper, {
        childList: true,
        subtree: true,
        characterDataOldValue: true,
    });
}

export default indicationSelectedProducts;

interface productData {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

function watchByCards() {
    if (document.querySelector('.cards-block')) {
        const cardsWrapper = document.querySelector('.cards-block') as HTMLElement;
        const [inputStart, inputEnd] = document.querySelectorAll(
            '.sidebar__filter-price input'
        ) as NodeListOf<HTMLInputElement>;
        const observer = new MutationObserver(() => {
            const showedProductCards: productData[] = JSON.parse(localStorage.getItem('productCards') || '');
            const beginPriceElement = document.querySelector('.price-amount .amount-begin') as HTMLElement;
            const endPriceElement = document.querySelector('.price-amount .amount-end') as HTMLElement;
            if (showedProductCards.length != 0) {
                const filterCardsByPrice = showedProductCards.sort((a, b) => a.price - b.price);
                const minFilterPrice = filterCardsByPrice[0].price.toString();
                const maxFilterPrice = filterCardsByPrice[filterCardsByPrice.length - 1].price.toString();

                inputStart.value = minFilterPrice;
                inputEnd.value = maxFilterPrice;

                beginPriceElement.textContent = minFilterPrice;
                endPriceElement.textContent = maxFilterPrice;
            } else {
                inputStart.value = '0';
                inputEnd.value = '0';

                beginPriceElement.textContent = '0';
                endPriceElement.textContent = '0';
            }
        });
        observer.observe(cardsWrapper, {
            childList: true,
            subtree: true,
            characterDataOldValue: true,
        });
    }
}

export default watchByCards;

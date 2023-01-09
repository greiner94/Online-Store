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
    const cardsWrapper = document.querySelector('.cards-block') as HTMLElement;
    const [inputStart, inputEnd] = document.querySelectorAll(
        '.sidebar__filter-stock input'
    ) as NodeListOf<HTMLInputElement>;
    const observer = new MutationObserver(() => {
        const showedProductCards: productData[] = JSON.parse(localStorage.getItem('productCards') || '');
        const beginStockElement = document.querySelector('.stock-amount .amount-begin') as HTMLElement;
        const endStockElement = document.querySelector('.stock-amount .amount-end') as HTMLElement;
        if (showedProductCards.length != 0) {
            const filterCardsByStock = showedProductCards.sort((a, b) => a.stock - b.stock);
            const minFilterStock = filterCardsByStock[0].stock.toString();
            const maxFilterStock = filterCardsByStock[filterCardsByStock.length - 1].stock.toString();

            inputStart.value = minFilterStock;
            inputEnd.value = maxFilterStock;

            beginStockElement.textContent = minFilterStock;
            endStockElement.textContent = maxFilterStock;
        } else {
            inputStart.value = '0';
            inputEnd.value = '0';

            beginStockElement.textContent = '0';
            endStockElement.textContent = '0';
        }
    });
    observer.observe(cardsWrapper, {
        childList: true,
        subtree: true,
        characterDataOldValue: true,
    });
}

export default watchByCards;

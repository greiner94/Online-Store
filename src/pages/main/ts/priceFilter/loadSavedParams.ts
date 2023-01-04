import { allPrices } from '../productsData';

function loadSavedParams() {
    if (document.querySelector('.cards-block')) {
        interface queryData {
            priceMin?: string;
            priceMax?: string;
        }
        const query: queryData = JSON.parse(localStorage.getItem('query') || '');
        const [inputStart, inputEnd] = document.querySelectorAll(
            '.sidebar__filter-price input'
        ) as NodeListOf<HTMLInputElement>;
        const beginPriceElement = document.querySelector('.price-amount .amount-begin') as HTMLElement;
        const endPriceElement = document.querySelector('.price-amount .amount-end') as HTMLElement;

        if (query.priceMin && query.priceMax) {
            inputStart.value = query.priceMin;
            inputEnd.value = query.priceMax;
            beginPriceElement.textContent = query.priceMin;
            endPriceElement.textContent = query.priceMax;
        } else {
            const sortedPrices = allPrices.sort((a, b) => a - b);
            const minPrice = sortedPrices[0];
            const maxPrice = sortedPrices[sortedPrices.length - 1];

            inputStart.value = minPrice.toString();
            inputEnd.value = maxPrice.toString();
            beginPriceElement.textContent = minPrice.toString();
            endPriceElement.textContent = maxPrice.toString();
        }
    }
}

export default loadSavedParams;

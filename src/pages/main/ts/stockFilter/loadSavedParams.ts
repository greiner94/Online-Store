import { allStocks } from '../productsData';

function loadSavedParams() {
    if (document.querySelector('.cards-block')) {
        interface queryData {
            stockMin?: string;
            stockMax?: string;
        }
        const query: queryData = JSON.parse(localStorage.getItem('query') || '');
        const [inputStart, inputEnd] = document.querySelectorAll(
            '.sidebar__filter-stock input'
        ) as NodeListOf<HTMLInputElement>;
        const beginStockElement = document.querySelector('.stock-amount .amount-begin') as HTMLElement;
        const endStockElement = document.querySelector('.stock-amount .amount-end') as HTMLElement;

        if (query.stockMin && query.stockMax) {
            inputStart.value = query.stockMin;
            inputEnd.value = query.stockMax;
            beginStockElement.textContent = query.stockMin;
            endStockElement.textContent = query.stockMax;
        } else {
            const sortedStocks = allStocks.sort((a, b) => a - b);
            const minStock = sortedStocks[0];
            const maxStock = sortedStocks[sortedStocks.length - 1];

            inputStart.value = minStock.toString();
            inputEnd.value = maxStock.toString();
            beginStockElement.textContent = minStock.toString();
            endStockElement.textContent = maxStock.toString();
        }
    }
}

export default loadSavedParams;

import { allStocks } from '../productsData';

function renderStockFilter(): void {
    const sortedStocks = allStocks.sort((a, b) => a - b);
    const minStock = sortedStocks[0];
    const maxStock = sortedStocks[sortedStocks.length - 1];

    const beginStockElement = document.querySelector('.stock-amount .amount-begin') as HTMLElement;
    const endStockElement = document.querySelector('.stock-amount .amount-end') as HTMLElement;

    beginStockElement.textContent = minStock.toString();
    endStockElement.textContent = maxStock.toString();

    const inputs = document.querySelectorAll('.sidebar__filter-stock input');
    inputs.forEach((input) => {
        input.setAttribute('min', minStock.toString());
        input.setAttribute('max', maxStock.toString());
    });
}

export default renderStockFilter;

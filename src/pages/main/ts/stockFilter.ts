import { allStocks } from './productsData';

function stockFilter(): void {
    const sortedStock = allStocks.sort((a, b) => a - b);
    const minStock = sortedStock[0];
    const maxStock = sortedStock[sortedStock.length - 1];

    const beginStockElement = document.querySelector('.stock-amount .amount-begin') as HTMLElement;
    const endStockElement = document.querySelector('.stock-amount .amount-end') as HTMLElement;

    beginStockElement.textContent = minStock.toString();
    endStockElement.textContent = maxStock.toString();
}

export default stockFilter;

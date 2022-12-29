import { allPrices } from '../productsData';

function renderPriceFilter(): void {
    const sortedPrices = allPrices.sort((a, b) => a - b);
    const minPrice = sortedPrices[0];
    const maxPrice = sortedPrices[sortedPrices.length - 1];

    const beginPriceElement = document.querySelector('.price-amount .amount-begin') as HTMLElement;
    const endPriceElement = document.querySelector('.price-amount .amount-end') as HTMLElement;

    beginPriceElement.textContent = minPrice.toString();
    endPriceElement.textContent = maxPrice.toString();

    const inputs = document.querySelectorAll('.sidebar__filter-price input');
    inputs.forEach((input) => {
        input.setAttribute('min', minPrice.toString());
        input.setAttribute('max', maxPrice.toString());
    });
}

export default renderPriceFilter;

import filterController from '../filterController';
import { setQueryParams } from '../setQueryParams';
import loadSavedParams from './loadSavedParams';
import watchByCards from './watchByCards';
import renderPriceFilter from './renderPriceFilter';
function priceFilter() {
    renderPriceFilter();
    loadSavedParams();
    filterController();
    watchByCards();
    const [startInput, endInput] = document.querySelectorAll(
        '.sidebar__filter-price input'
    ) as NodeListOf<HTMLInputElement>;
    const beginPriceElement = document.querySelector('.price-amount .amount-begin') as HTMLElement;
    const endPriceElement = document.querySelector('.price-amount .amount-end') as HTMLElement;

    let inputRange: string[];

    [startInput, endInput].forEach((input) => {
        input.addEventListener('mousedown', () => {
            input.addEventListener('mousemove', () => {
                inputRange = [startInput.value, endInput.value].sort((a, b) => +a - +b);
                beginPriceElement.textContent = inputRange[0];
                endPriceElement.textContent = inputRange[1];
            });
        });
        input.addEventListener('mouseup', () => {
            setQueryParams('priceMin', inputRange[0]);
            setQueryParams('priceMax', inputRange[1]);
            filterController();
        });
    });

    window.addEventListener('popstate', () => {
        loadSavedParams();
        filterController();
    });

    const resetBtn = document.querySelector('.reset-filters') as HTMLElement;
    resetBtn.addEventListener('click', () => {
        loadSavedParams();
        filterController();
    });
}

export default priceFilter;

import filterController from '../filterController';
import { setQueryParams } from '../setQueryParams';
import loadSavedParams from './loadSavedParams';
import watchByCards from './watchByCards';
import renderStockFilter from './renderStockFilter';
function stockFilter() {
    renderStockFilter();
    loadSavedParams();
    filterController();
    watchByCards();
    const [startInput, endInput] = document.querySelectorAll(
        '.sidebar__filter-stock input'
    ) as NodeListOf<HTMLInputElement>;
    const beginStockElement = document.querySelector('.stock-amount .amount-begin') as HTMLElement;
    const endStockElement = document.querySelector('.stock-amount .amount-end') as HTMLElement;

    let inputRange: string[];

    [startInput, endInput].forEach((input) => {
        input.addEventListener('mousedown', () => {
            input.addEventListener('mousemove', () => {
                inputRange = [startInput.value, endInput.value].sort((a, b) => +a - +b);
                beginStockElement.textContent = inputRange[0];
                endStockElement.textContent = inputRange[1];
            });
        });
        input.addEventListener('mouseup', () => {
            setQueryParams('stockMin', inputRange[0]);
            setQueryParams('stockMax', inputRange[1]);
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

export default stockFilter;

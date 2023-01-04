import filterController from '../filterController';
import { setQueryParams } from '../setQueryParams';
import checkedBrandSwitcher from './checkedBrandSwitcher';
import quantityBrand from './quantityBrand';
import renderBrandFilter from './renderBrandFilter';

function brandFilter() {
    if (document.querySelector('.cards-block')) {
        renderBrandFilter();
        filterController();
        checkedBrandSwitcher();
        quantityBrand();

        const brandFilterElement = document.querySelector('.brand.filter-list.checked-block') as HTMLElement;
        brandFilterElement.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const brandName = target.firstElementChild?.textContent || '';

            if (target.classList.contains('filter-item')) {
                setQueryParams('brand', brandName, true);
                filterController();
                checkedBrandSwitcher();
            }
        });
        window.addEventListener('popstate', () => {
            checkedBrandSwitcher();
            filterController();
        });
        const resetBtn = document.querySelector('.reset-filters') as HTMLElement;
        resetBtn.addEventListener('click', () => {
            filterController();
            checkedBrandSwitcher();
        });
    }
}

export default brandFilter;

import { setQueryParams } from '../setQueryParams';
import checkedBrandSwitcher from './checkedBrandSwitcher';
import filterCardsByBrand from './filterCardsByBrand';
import quantityBrand from './quantityBrand';
import renderBrandFilter from './renderBrandFilter';

function brandFilter() {
    renderBrandFilter();
    filterCardsByBrand();
    checkedBrandSwitcher();
    quantityBrand();

    const brandFilterElement = document.querySelector('.brand.filter-list.checked-block') as HTMLElement;
    brandFilterElement.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const brandName = target.firstElementChild?.textContent || '';

        if (target.classList.contains('filter-item')) {
            target.classList.toggle('checked');
            setQueryParams('brand', brandName, true);
            filterCardsByBrand();
            checkedBrandSwitcher();
            quantityBrand();
        }
    });
    window.addEventListener('popstate', () => {
        checkedBrandSwitcher();
        filterCardsByBrand();
    });
    const resetBtn = document.querySelector('.reset-filters') as HTMLElement;
    resetBtn.addEventListener('click', () => {
        filterCardsByBrand();
        checkedBrandSwitcher();
    });
}

export default brandFilter;

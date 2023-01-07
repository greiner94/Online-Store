import { setQueryParams } from '../setQueryParams';
import checkedCategorySwitcher from './checkedCategorySwitcher';
import filterController from '../filterController';
import quantityCategory from './quantityCategory';
import renderCategoryFilter from './renderCategotyFilter';

function categoryFilter() {
    if (document.querySelector('.cards-block')) {
        renderCategoryFilter();
        filterController();
        checkedCategorySwitcher();
        quantityCategory();

        const categoryFilterElement = document.querySelector(
            '.product-categories.filter-list.checked-block'
        ) as HTMLElement;
        categoryFilterElement.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const categoryName = target.firstElementChild?.textContent || '';
            if (target.classList.contains('filter-item')) {
                setQueryParams('category', categoryName, true);
                filterController();
                checkedCategorySwitcher();
            }
        });
        window.addEventListener('popstate', () => {
            checkedCategorySwitcher();
            filterController();
        });
        // const resetBtn = document.querySelector('.reset-filters') as HTMLElement;
        // resetBtn.addEventListener('click', () => {
        //     filterController();
        //     checkedCategorySwitcher();
        // });
    }
}

export default categoryFilter;

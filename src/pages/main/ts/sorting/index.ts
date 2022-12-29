import { setQueryParams } from '../setQueryParams';
import loadSavedParams from './loadSavedParams';
import sort from './sort';

function sorting() {
    loadSavedParams();
    sort();

    const select = document.querySelector('.sort-product') as HTMLSelectElement;
    select?.addEventListener('change', () => {
        sort();
        setQueryParams('sorting', select.selectedIndex.toString());
    });

    window.addEventListener('popstate', () => {
        loadSavedParams();
        sort();
    });
}

export default sorting;

import filterController from '../filterController';
import { setQueryParams } from '../setQueryParams';
import loadSavedParams from './loadSavedParams';

function search() {
    loadSavedParams();
    filterController();

    const searchSubmit = document.querySelector('.search-form__btn') as HTMLButtonElement;
    const searchInput = document.querySelector('.search-form__input') as HTMLInputElement;
    searchSubmit.addEventListener('click', (event: Event) => {
        event.preventDefault();

        filterController();
        setQueryParams('search', searchInput.value);
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

export default search;

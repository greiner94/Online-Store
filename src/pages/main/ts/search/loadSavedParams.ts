interface query {
    search: string;
}
function loadSavedParams() {
    if (document.querySelector('.cards-block')) {
        const select = document.querySelector('.search-form__input') as HTMLSelectElement;
        const savedSortType: query = JSON.parse(localStorage.getItem('query') || '');
        if (savedSortType.search) {
            select.value = savedSortType.search;
        } else {
            select.value = '';
        }
    }
}

export default loadSavedParams;

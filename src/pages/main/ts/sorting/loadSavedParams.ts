interface query {
    sorting: string;
}
function loadSavedParams() {
    const select = document.querySelector('.sort-product') as HTMLSelectElement;
    const savedSortType: query = JSON.parse(localStorage.getItem('query') || '');
    select.selectedIndex = +savedSortType.sorting;
}

export default loadSavedParams;

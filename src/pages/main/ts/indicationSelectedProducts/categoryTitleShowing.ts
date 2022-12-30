interface query {
    category: string;
}

function categoryTitleShowing() {
    const categoryTitle = document.querySelector('.product-section__title') as HTMLElement;
    const savedSortType: query = JSON.parse(localStorage.getItem('query') || '');
    if (!savedSortType.category) {
        categoryTitle.textContent = 'All categories';
    } else {
        categoryTitle.textContent = savedSortType.category
            .split(',')
            .map((elem) => elem[0].toUpperCase() + elem.slice(1))
            .join(', ');
    }
}

export default categoryTitleShowing;

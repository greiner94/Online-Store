function checkedCategorySwitcher() {
    const categoryFilterElements = document.querySelectorAll(
        '.product-categories.filter-list.checked-block .filter-item'
    ) as NodeListOf<HTMLElement>;

    let filteredCategory: string[];
    if (!JSON.parse(localStorage.getItem('query') || '').hasOwnProperty('category')) {
        filteredCategory = [''];
    } else {
        filteredCategory = JSON.parse(localStorage.getItem('query') || '').category.split(',');
    }
    categoryFilterElements.forEach((elem: HTMLElement) => {
        if (filteredCategory.includes(elem.firstElementChild?.textContent || '')) {
            elem.classList.add('checked');
        } else {
            elem.classList.remove('checked');
        }
    });
}

export default checkedCategorySwitcher;

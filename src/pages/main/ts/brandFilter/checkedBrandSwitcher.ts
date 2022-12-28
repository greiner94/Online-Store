function checkedBrandSwitcher() {
    const brandFilterElements = document.querySelectorAll(
        '.brand.filter-list.checked-block .filter-item'
    ) as NodeListOf<HTMLElement>;

    let filteredBrands: string[];
    if (!JSON.parse(localStorage.getItem('query') || '').hasOwnProperty('brand')) {
        filteredBrands = [''];
    } else {
        filteredBrands = JSON.parse(localStorage.getItem('query') || '').brand.split(',');
    }

    brandFilterElements.forEach((elem: HTMLElement) => {
        if (filteredBrands.includes(elem.firstElementChild?.textContent || '')) {
            elem.classList.add('checked');
        } else {
            elem.classList.remove('checked');
        }
    });
}

export default checkedBrandSwitcher;

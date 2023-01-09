interface query {
    brand: string;
}

function brandTitleShowing() {
    const brandTitleWrapper = document.querySelector('.status-bar__select-filters.filter-block') as HTMLElement;
    const savedSortType: query = JSON.parse(localStorage.getItem('query') || '');
    let innerHtmlBrandTitle = '';
    if (!savedSortType.brand) {
        brandTitleWrapper.innerHTML = '';
    } else {
        const selectedBrands = savedSortType.brand.split(',');
        selectedBrands.forEach((brand) => {
            innerHtmlBrandTitle += `
            <span class="select-filter filter-block__item">${brand}</span>
        `;
        });
        brandTitleWrapper.innerHTML = innerHtmlBrandTitle;
    }

    const brandItems = document.querySelectorAll('.select-filter.filter-block__item') as NodeListOf<HTMLElement>;
    const brandFilterItems = document.querySelectorAll(
        '.brand.filter-list.checked-block .filter-item'
    ) as NodeListOf<HTMLElement>;
    brandItems.forEach((brand) => {
        brand.addEventListener('click', (event: Event) => {
            const target = event.target as HTMLElement;
            brandFilterItems.forEach((checkedBrand: HTMLElement) => {
                const checkedBrandName = checkedBrand.querySelector('.filter-item__name')?.textContent;
                if (checkedBrandName == target.textContent) {
                    checkedBrand.click();
                }
            });
        });
    });
}

export default brandTitleShowing;

import { allCategories } from '../productsData';

function renderCategoryFilter(): void {
    const categoryFilterElement = document.querySelector(
        '.product-categories.filter-list.checked-block'
    ) as HTMLElement;
    let categoryFilterHtml = '';

    for (const category in allCategories) {
        categoryFilterHtml += `
          <li class="filter-item">
            <span class="filter-item__name">${category}</span>
            <span class="quantity-wrapper">
              <span class="filter-item__chose-quantity">${allCategories[category]}</span>
                /
              <span class="filter-item__all-quantity">${allCategories[category]}</span>
            </span>
          </li>
      `;
    }

    categoryFilterElement.innerHTML = categoryFilterHtml;
}

export default renderCategoryFilter;

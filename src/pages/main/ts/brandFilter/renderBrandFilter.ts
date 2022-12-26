import { allBrands } from '../productsData';

function renderBrandFilter(): void {
    const brandFilterElement = document.querySelector('.brand.filter-list.checked-block') as HTMLElement;
    let brandFilterHtml = '';

    for (const brand in allBrands) {
        brandFilterHtml += `
          <li class="filter-item">
            <span class="filter-item__name">${brand}</span>
            <span class="quantity-wrapper">
              (
                <span class="filter-item__chose-quantity">${allBrands[brand]}</span>
                /
                <span class="filter-item__all-quantity">${allBrands[brand]}</span>
              )
            </span>
          </li>
      `;
    }

    brandFilterElement.innerHTML = brandFilterHtml;
}

export default renderBrandFilter;

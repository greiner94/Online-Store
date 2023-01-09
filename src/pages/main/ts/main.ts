import '../style/style.scss';

export function renderMainPage() {
    renderStartPage();
}
function renderStartPage(): void {
    const headerEl = <HTMLElement>document.querySelector('.header');
    const documentFragment = <DocumentFragment>document.createDocumentFragment();
    const mainEl = <HTMLElement>document.createElement('main');
    const asideEl = <HTMLElement>document.createElement('aside');
    const cardsBlockEl = <HTMLDivElement>document.createElement('div');
    const categoriesBlock = <HTMLDivElement>document.createElement('div');
    const categoriesList = <HTMLUListElement>document.createElement('ul');
    const brandBlock = <HTMLDivElement>document.createElement('div');
    const brandList = <HTMLUListElement>document.createElement('ul');
    const priceBlock = <HTMLDivElement>document.createElement('div');
    const stockBlock = <HTMLDivElement>document.createElement('div');
    const sectionProducts = <HTMLElement>document.createElement('section');
    const asideProducts = <HTMLElement>document.createElement('aside');
    const asideSelectFilters = <HTMLDivElement>document.createElement('div');
    const asideSaveReset = <HTMLDivElement>document.createElement('div');
    const asideSortBlock = <HTMLDivElement>document.createElement('div');
    mainEl.className = 'main';
    asideEl.className = 'sidebar';
    cardsBlockEl.className = 'cards-block';
    categoriesBlock.className = 'sidedebar__filter-category filter-block';
    categoriesList.className = 'product-categories filter-list checked-block';
    brandBlock.className = 'sideBar__filter-brand filter-block';
    brandList.className = 'brand filter-list checked-block';
    priceBlock.className = 'sidebar__filter-price filter-block';
    stockBlock.className = 'sidebar__filter-stock filter-block';
    sectionProducts.className = 'product-section';
    asideProducts.className = 'status-bar';
    asideSelectFilters.className = 'status-bar__select-filters filter-block';
    asideSaveReset.className = 'status-bar__reset-save-filters filter-block';
    asideSortBlock.className = 'status-bar__sort-products';
    getStatusSelected(asideProducts);
    getResetSaveBtn(asideSaveReset);
    getCategoriesHeader(categoriesBlock);
    getBrandHeader(brandBlock);
    getPriceFilter(priceBlock);
    getStockFilter(stockBlock);
    getHeaderLine(sectionProducts);
    getSortSelect(asideSortBlock);
    asideProducts.append(asideSelectFilters, asideSaveReset, asideSortBlock);
    sectionProducts.append(asideProducts, cardsBlockEl);
    brandBlock.appendChild(brandList);
    categoriesBlock.appendChild(categoriesList);
    asideEl.append(categoriesBlock, brandBlock, priceBlock, stockBlock);
    mainEl.append(asideEl, sectionProducts);
    documentFragment.append(mainEl);
    headerEl.after(documentFragment);
}
function getCategoriesHeader(parentNode: HTMLElement): void {
    parentNode.innerHTML = `<h3 class="filter-title all-goods">
                            <span class="filter-title__name">
                                All products
                            </span>
                            <span class="quantity-wrapper">
                                <span class="filter-item__chose-quantity">
                                    10
                                </span>
                                    /
                                <span class="filter-item__all-quantity">
                                    342
                                </span>
                            </span>
                        </h3>`;
}
function getBrandHeader(parentNode: HTMLElement): void {
    parentNode.innerHTML = `<h3 class="filter-title">Brand</h3>`;
}
function getPriceFilter(parentNode: HTMLElement): void {
    parentNode.innerHTML = `<h3 class="filter-title">Price</h3>
                            <div class="price-amount">
                                <span class="amount-begin money">10</span> —
                                <span class="amount-end money">10000</span>
                            </div>
                            <div class="dual-slider">
                                <input type="range" min="0" max="75" class="slider">
                                <input type="range" min="0" max="75" class="slider">
                            </div>`;
}
function getStockFilter(parentNode: HTMLElement): void {
    parentNode.innerHTML = `<h3 class="filter-title">Stock</h3>
                            <div class="stock-amount">
                                <span class="amount-begin"></span> —
                                <span class="amount-end"></span>
                            </div>
                            <div class="dual-slider">
                                <input type="range" min="" max="" class="slider">
                                <input type="range" min="" max="" class="slider">
                            </div>`;
}
function getHeaderLine(parentNode: HTMLElement): void {
    parentNode.innerHTML = `<div class="header-line">
                                <h2 class="product-section__title"></h2>
                                <div class="view-mode">
                                    <span class="view-mode__list"></span>
                                    <span class="view-mode__cards active"></span>
                                </div>
                            </div>`;
}
function getStatusSelected(parentNode: HTMLElement): void {
    parentNode.innerHTML = `<div class="status-bar__select-goods">
                                <span>Found</span>
                                <span class="amount">**100**</span>
                            </div>`;
}
function getResetSaveBtn(parentNode: HTMLElement): void {
    parentNode.innerHTML = `<span class="reset-filters filter-block__item">
                                Reset all filters
                            </span>
                            <span class="save-filters filter-block__item">
                                Save filters
                            </span>`;
}
function getSortSelect(parentNode: HTMLElement): void {
    parentNode.innerHTML = `<select name="sort-product" class="sort-product">
                                <option value="">--Sort options:--</option>
                                <option value="sort-rating">Sort by rating</option>
                                <option value="sort-price-low">Sort by price from low</option>
                                <option value="sort-price-high">Sort by price from high</option>
                            </select>`;
}

interface productData {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

function quantityCategory() {
    const cardsWrapper = document.querySelector('.card-block') as HTMLElement;
    const observer = new MutationObserver(() => {
        changeFliterCategoryQuantity();
    });
    observer.observe(cardsWrapper, {
        childList: true,
        subtree: true,
        characterDataOldValue: true,
    });

    changeFliterCategoryQuantity();
}

function changeFliterCategoryQuantity() {
    const categoryFilterElements = document.querySelectorAll(
        '.product-categories.filter-list.checked-block .filter-item'
    ) as NodeListOf<HTMLElement>;
    const showedProductCards: productData[] = JSON.parse(localStorage.getItem('productCards') || '[]');
    categoryFilterElements.forEach((filterElement) => {
        const filterCategoryName = filterElement.querySelector('.filter-item__name')?.textContent || '';
        const filterCategoryQuantity = filterElement.querySelector('.filter-item__chose-quantity') as HTMLElement;
        let counter = 0;

        showedProductCards.forEach(({ category }) => {
            if (filterCategoryName === category) {
                counter += 1;
            }
        });

        filterCategoryQuantity.textContent = counter.toString();
    });
}

export default quantityCategory;

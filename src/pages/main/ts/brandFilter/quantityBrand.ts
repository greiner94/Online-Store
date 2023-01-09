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

function quantityBrand() {
    const cardsWrapper = document.querySelector('.cards-block') as HTMLElement;
    const observer = new MutationObserver(() => {
        changeFliterBrandQuantity();
    });
    observer.observe(cardsWrapper, {
        childList: true,
        subtree: true,
        characterDataOldValue: true,
    });

    changeFliterBrandQuantity();
}

function changeFliterBrandQuantity() {
    const brandFilterElements = document.querySelectorAll(
        '.brand.filter-list.checked-block .filter-item'
    ) as NodeListOf<HTMLElement>;
    const showedProductCards: productData[] = JSON.parse(localStorage.getItem('productCards') || '[]');
    brandFilterElements.forEach((filterElement) => {
        const filterBrandName = filterElement.querySelector('.filter-item__name')?.textContent || '';
        const filterBrandQuantity = filterElement.querySelector('.filter-item__chose-quantity') as HTMLElement;
        let counter = 0;

        showedProductCards.forEach(({ brand }) => {
            if (filterBrandName === brand) {
                counter += 1;
            }
        });

        filterBrandQuantity.textContent = counter.toString();
    });
}

export default quantityBrand;

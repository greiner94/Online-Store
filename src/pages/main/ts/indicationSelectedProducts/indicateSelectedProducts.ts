import data from '../../../../assets/products.json';
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

function indicateSelectedProducts() {
    const productCards: productData[] = JSON.parse(localStorage.getItem('productCards') || '');
    const productsList = data.products;
    const chooseQuantitySmall = document.querySelector('.filter-item__chose-quantity') as HTMLElement;
    const chooseQuantityLarge = document.querySelector('.status-bar__select-goods .amount') as HTMLElement;
    const allQuantity = document.querySelector('.filter-item__all-quantity') as HTMLElement;

    allQuantity.textContent = productsList.length.toString();
    chooseQuantitySmall.textContent = productCards.length.toString();
    chooseQuantityLarge.textContent = productCards.length.toString() + (productCards.length == 1 ? '  item' : ' items');
}

export default indicateSelectedProducts;

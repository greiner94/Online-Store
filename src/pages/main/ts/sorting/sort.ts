import renderProuductsCards from '../renderProuductsCards';
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
function sort(): void {
    if (document.querySelector('.cards-block')) {
        const productCards: productData[] = JSON.parse(localStorage.getItem('productCards') || '');
        const select = document.querySelector('.sort-product') as HTMLSelectElement;
        const sortType = select.selectedIndex;
        let sortedProducts: productData[];
        switch (sortType) {
            case 1: {
                sortedProducts = productCards.sort((a, b) => b.rating - a.rating);
                break;
            }
            case 2: {
                sortedProducts = productCards.sort((a, b) => a.price - b.price);
                break;
            }
            case 3: {
                sortedProducts = productCards.sort((a, b) => b.price - a.price);
                break;
            }
            default: {
                sortedProducts = productCards;
            }
        }
        renderProuductsCards(sortedProducts);
    }
}

export default sort;

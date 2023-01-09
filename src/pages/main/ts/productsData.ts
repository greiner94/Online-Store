import data from '../../../assets/products.json';

const productsList = data.products;

interface CategoriesList {
    [categoryName: string]: number;
}

interface BrandList {
    [brandsName: string]: number;
}

const allCategories: CategoriesList = {};
const allBrands: BrandList = {};
const allPrices: number[] = [];
const allStocks: number[] = [];

productsList.forEach(({ category, brand, price, stock }) => {
    if (allCategories[category]) {
        allCategories[category] += 1;
    } else {
        allCategories[category] = 1;
    }

    if (allBrands[brand]) {
        allBrands[brand] += 1;
    } else {
        allBrands[brand] = 1;
    }

    allPrices.push(price);
    allStocks.push(stock);
});

export { allCategories, allBrands, allPrices, allStocks };

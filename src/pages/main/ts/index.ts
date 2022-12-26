import '../index.html';
import '../style/style.scss';
import '../../../assets/ts/template';

import data from '../../../assets/products.json';
import { windowOnload } from './windowOnload';
import categoryFilter from './categoryFilter';
import brandFilter from './brandFilter';
import priceFilter from './priceFilter';
import stockFilter from './stockFilter';
import renderProuductsCards from './renderProuductsCards';
import { switchMode } from './switchMode';
import { queryReset, querySave } from './queryResetSave';

const modeCards = <HTMLElement>document.querySelector('.view-mode__cards');
const modeList = <HTMLElement>document.querySelector('.view-mode__list');
modeCards.addEventListener('click', (e: Event) => {
    switchMode<Event>(e);
});
modeList.addEventListener('click', (e: Event) => {
    switchMode<Event>(e);
});

const productsList = data.products;
renderProuductsCards(productsList);
queryReset();
querySave();
windowOnload();
categoryFilter();
brandFilter();
priceFilter();
stockFilter();

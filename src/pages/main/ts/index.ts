import '../index.html';
import '../style/style.scss';
import '../../../assets/ts/template';

import { windowOnload } from './windowOnload';
import categoryFilter from './categoryFilter';
import brandFilter from './brandFilter';
import priceFilter from './priceFilter';
import stockFilter from './stockFilter';
import prouductsCarts from './prouductsCarts';
import { switchMode } from './switchMode';

const modeCards = <HTMLElement>document.querySelector('.view-mode__cards');
const modeList = <HTMLElement>document.querySelector('.view-mode__list');
modeCards.addEventListener('click', (e: Event) => {
    switchMode<Event>(e);
});
modeList.addEventListener('click', (e: Event) => {
    switchMode<Event>(e);
});

windowOnload();
categoryFilter();
brandFilter();
priceFilter();
stockFilter();
prouductsCarts();

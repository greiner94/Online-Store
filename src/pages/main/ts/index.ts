import '../index.html';
import '../style/style.scss';
import '../../../assets/ts/template';

import categoryFilter from './categoryFilter';
import brandFilter from './brandFilter';
import priceFilter from './priceFilter';
import stockFilter from './stockFilter';
import prouductsCarts from './prouductsCarts';
import switchMode from './switchMode';

const modeCards = <HTMLElement>document.querySelector('.view-mode__cards');
const modeList = <HTMLElement>document.querySelector('.view-mode__list');
modeCards.addEventListener('click', switchMode);
modeList.addEventListener('click', switchMode);

categoryFilter();
brandFilter();
priceFilter();
stockFilter();
prouductsCarts();

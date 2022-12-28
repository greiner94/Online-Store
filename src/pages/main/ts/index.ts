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
import { listenSwitchingMode } from './switchMode';
import { queryReset, querySave } from './queryResetSave';
import { headerImplement } from './headerImplement';

headerImplement();
const productsList = data.products;
renderProuductsCards(productsList);
queryReset();
querySave();
windowOnload();
categoryFilter();
brandFilter();
priceFilter();
stockFilter();
listenSwitchingMode();

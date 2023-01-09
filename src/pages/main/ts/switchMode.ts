import { setQueryParams } from './setQueryParams';
/**
 * @param data  data has 2 type: event from addEventListener and string ('cards' or 'list') from
 * localStorage
 */
export function switchMode<T>(data: T): void {
    const modeCards = <HTMLElement>document.querySelector('.view-mode__cards');
    const modeList = <HTMLElement>document.querySelector('.view-mode__list');
    const productBlock = <HTMLElement>document.querySelector('.cards-block');
    const target = <HTMLElement>(<Event>data).target || null;
    if (target?.className === 'view-mode__cards' || data === 'cards') {
        modeCards.classList.add('active');
        modeList.classList.remove('active');
        productBlock.classList.remove('list-block');
        setQueryParams('mode', 'cards');
    } else if (target?.className === 'view-mode__list' || data === 'list') {
        modeCards.classList.remove('active');
        modeList.classList.add('active');
        productBlock.classList.add('list-block');
        setQueryParams('mode', 'list');
    }
}

export function listenSwitchingMode() {
    const modeCards = <HTMLElement>document.querySelector('.view-mode__cards');
    const modeList = <HTMLElement>document.querySelector('.view-mode__list');
    modeCards.addEventListener('click', (e: Event) => {
        switchMode<Event>(e);
    });
    modeList.addEventListener('click', (e: Event) => {
        switchMode<Event>(e);
    });
}

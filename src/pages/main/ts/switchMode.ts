const modeCards = <HTMLElement>document.querySelector('.view-mode__cards');
const modeList = <HTMLElement>document.querySelector('.view-mode__list');
const productBlock = <HTMLElement>document.querySelector('.card-block');
function switchMode(event: Event): void {
    console.log('event', event);
    const target = <HTMLElement>event.target;
    if (target.className === 'view-mode__cards') {
        modeCards.classList.add('active');
        modeList.classList.remove('active');
        productBlock.classList.remove('list-block');
    } else {
        modeCards.classList.remove('active');
        modeList.classList.add('active');
        productBlock.classList.add('list-block');
    }
}
export default switchMode;

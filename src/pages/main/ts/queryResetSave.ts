import { QueryParams } from './type';
import checkedBrandSwitcher from './brandFilter/checkedBrandSwitcher';
import filterController from './filterController';
import checkedCategorySwitcher from './categoryFilter/checkedCategorySwitcher';

export function queryReset(): void {
    const localProp = 'query';
    const resetBtn = <Element>document.querySelector('.reset-filters');
    resetBtn?.addEventListener('click', () => {
        const localStorageObj = <QueryParams>JSON.parse(localStorage.getItem(localProp) || '{}');
        const localStorageArr = <[string, string | string[]][]>Object.entries(localStorageObj);
        const filtered = <[string, string | string[]][]>localStorageArr.filter(([key]) => key === 'mode');
        const newLocalStorageObj = <QueryParams>Object.fromEntries(filtered);
        const valueJson: string = JSON.stringify(newLocalStorageObj);
        localStorage.removeItem(localProp);
        localStorage.setItem(localProp, valueJson);
        const url = new URL(window.location.href);
        const searchParams: URLSearchParams = url.searchParams;
        const selectedMode = searchParams.get('mode') || '';
        const clearUrl = new URL(window.location.origin);
        clearUrl.searchParams.set('mode', selectedMode);
        window.history.pushState({}, '', clearUrl);
        filterController();
        checkedBrandSwitcher();
        checkedCategorySwitcher();
    });
}
export function querySave(): void {
    const saveBtn = <HTMLElement>document.querySelector('.save-filters');
    saveBtn?.addEventListener('click', () => {
        const url = new URL(window.location.href);
        navigator.clipboard.writeText(url.href.toString()).then(() => {
            saveBtn.textContent = 'Saved';
            saveBtn.style.background = '#25a53c';
            setTimeout(() => {
                saveBtn.textContent = 'Save filters';
                saveBtn.removeAttribute('style');
            }, 2000);
        });
    });
}

import { QueryParams } from './type';
export function queryReset(): void {
    const localProp = 'query';
    const resetBtn = <Element>document.querySelector('.reset-filters');
    resetBtn?.addEventListener('click', () => {
        // reset local storage params except mode
        const localStorageObj = <QueryParams>JSON.parse(localStorage.getItem(localProp) || '{}');
        const localStorageArr = <[string, string | string[]][]>Object.entries(localStorageObj);
        const filtered = <[string, string | string[]][]>localStorageArr.filter(([key]) => key === 'mode');
        const newLocalStorageObj = <QueryParams>Object.fromEntries(filtered);
        const valueJson: string = JSON.stringify(newLocalStorageObj);
        localStorage.removeItem(localProp);
        localStorage.setItem(localProp, valueJson);
        // reset url query params except mode
        const url = new URL(window.location.href);
        const searchParams: URLSearchParams = url.searchParams;
        const selectedMode = searchParams.get('mode') || '';
        const clearUrl = new URL(window.location.origin);
        clearUrl.searchParams.set('mode', selectedMode);
        window.history.pushState({}, '', clearUrl);
    });
}
export function querySave(): void {
    const saveBtn = document.querySelector('.save-filters');
    saveBtn?.addEventListener('click', () => {
        const url = new URL(window.location.href);
        navigator.clipboard.writeText(url.href.toString()).then(() => {
            alert('URL was copied');
        });
    });
}

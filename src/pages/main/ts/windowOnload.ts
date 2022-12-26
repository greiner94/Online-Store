import { switchMode } from './switchMode';
/**
 * Need change. Add parameters for load page
 */
export function windowOnload(): void {
    document.addEventListener('DOMContentLoaded', () => {
        changePageWithQueryParams();
    });
}

function changePageWithQueryParams(): void {
    const url = new URL(window.location.href);
    const localProp = 'query';
    const queryParams = JSON.parse(<string>localStorage.getItem(localProp));
    for (const key in queryParams) {
        url.searchParams.set(key, queryParams[key]);
        // Add parameter to this place: if (key === 'brand') than call your function
        if (key === 'mode') {
            const value = <string>queryParams[key];
            switchMode<string>(value);
        }
    }
    window.history.pushState({}, '', url);
}

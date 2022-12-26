import { addQueryParamsToLocalStorage } from './setQueryParams';
import { switchMode } from './switchMode';
/**
 * Need change. Add parameters for load page
 */
export function windowOnload(): void {
    addQueryParamsToLocalStorage();
    window.addEventListener('popstate', () => {
        addQueryParamsToLocalStorage();
    });
    changePageWithQueryParams();
}

function changePageWithQueryParams(): void {
    const localProp = 'query';
    const queryParams = JSON.parse(<string>localStorage.getItem(localProp));
    for (const key in queryParams) {
        // Add parameter to this place: if (key === 'brand') than call your function
        if (key === 'mode') {
            const value = <string>queryParams[key];
            switchMode<string>(value);
        }
    }
}

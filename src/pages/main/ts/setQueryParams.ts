import { QueryParams } from './type';
/**
 *
 * @param key name of query parameter
 * @param value value of query parameter
 * @param isMulty it is unnecessary param. If can be more than one query parameter value should use true,
 * than value will be added in array of values
 */
export function setQueryParams(key: string, value: string, isMulty = false): void {
    const url = new URL(window.location.href);
    const searchParams = <URLSearchParams>url.searchParams;

    if (!isMulty) {
        searchParams.set(key, value);
        window.history.pushState({}, '', url);
        addQueryParamsToLocalStorage();
    } else {
        let valuesArr: string[] = searchParams.get(key)?.split(',') || [];
        if (!valuesArr.includes(value)) {
            valuesArr.push(value);
        } else {
            valuesArr = valuesArr.filter((element: string) => element !== value);
        }

        const strParam: string = valuesArr.join(',');
        searchParams.set(key, strParam);
        window.history.pushState({}, '', url);
        addQueryParamsToLocalStorage();
    }
}

export function addQueryParamsToLocalStorage(): void {
    const localProp = 'query';
    const url = new URL(window.location.href);
    const keys = url.searchParams.keys();
    const queryParams: QueryParams = {};
    for (const key of keys) {
        queryParams[key] = <string>url.searchParams.get(key);
    }
    const valueJson = JSON.stringify(queryParams);
    localStorage.setItem(localProp, valueJson);
}

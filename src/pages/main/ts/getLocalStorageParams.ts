import { QueryParams } from './type';

export function getQueryParams(): QueryParams {
    const localProp = 'query';
    const queryParams: QueryParams = JSON.parse(localStorage.getItem(localProp) || '{}');
    return queryParams;
}

export function getClassMode(): string {
    const queryParams: QueryParams = getQueryParams();
    return queryParams.mode ? <string>queryParams.mode : 'cards';
}

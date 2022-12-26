import { setQueryParams } from './setQueryParams';
function brandQueryParams() {
    const brandFilterElement = document.querySelector('.brand.filter-list.checked-block') as HTMLElement;

    // saveBrandtoStorage();
    // window.onpopstate = saveBrandtoStorage;

    brandFilterElement.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const brandName = target.firstElementChild?.textContent || '';
        setQueryParams('brand', brandName, true);
        // if (target.classList.contains('filter-item')) {
        //     const url = new URL(window.location.href);
        //     const searchParams = url.searchParams;
        //     let selectedQueryBrands = searchParams.getAll('brand');

        //     if (selectedQueryBrands.includes(brandName)) {
        //         selectedQueryBrands = selectedQueryBrands.filter((elem) => elem !== brandName);
        //     } else {
        //         selectedQueryBrands.push(brandName);
        //     }
        //     // searchParams.delete('brand');
        //     // selectedQueryBrands.forEach((brandName) => {
        //     //     searchParams.append('brand', brandName);
        //     // });
        //     //const newUrl = url.toString();
        // }
        //     window.history.pushState({}, '', newUrl);

        //     saveBrandtoStorage();
        // }
    });
}

// function saveBrandtoStorage(): void {
//     const url = new URL(window.location.href);
//     const searchParams = url.searchParams;
//     const selectedQueryBrands = searchParams.getAll('brand');
//     localStorage.setItem('brand', JSON.stringify(selectedQueryBrands));
// }

export default brandQueryParams;

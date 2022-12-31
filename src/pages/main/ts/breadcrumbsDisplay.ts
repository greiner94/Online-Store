import '../style/cart.scss';

export function displayBreadcrumbs(): void {
    const main = <HTMLElement>document.querySelector('.main');
    const breadcrumbsFragment: DocumentFragment = document.createDocumentFragment();
    const navBreadcrumbs: HTMLElement = document.createElement('nav');
    navBreadcrumbs.classList.add('breadcrumbs');
    navBreadcrumbs.innerHTML = ` <a href="/" class="breadcrumbs__home">
                                    <img src="../../../assets/home_icon.svg" alt="home icon">
                                </a>
                                <a href="#" class="breadcrumbs__item">
                                    Smartphones
                                </a>
                                <a href="#" class="breadcrumbs__item">
                                    Apple
                                </a>
                                <a href="#" class="breadcrumbs__item">
                                    IPhone9
                                </a>`;
    breadcrumbsFragment.append(navBreadcrumbs);
    main.append(breadcrumbsFragment);
}

export function displayBreadcrumbsCart(): void {
    const main = <HTMLElement>document.querySelector('.main');
    const breadcrumbsFragment: DocumentFragment = document.createDocumentFragment();
    const navBreadcrumbs: HTMLElement = document.createElement('nav');
    navBreadcrumbs.classList.add('breadcrumbs');
    navBreadcrumbs.innerHTML = ` <a href="/" class="breadcrumbs__home">
                                    <img src="../../../assets/home_icon.svg" alt="home icon">
                                </a>
                                <a href="#" class="breadcrumbs__item">
                                    Cart
                                </a>`;
    breadcrumbsFragment.append(navBreadcrumbs);
    main.append(breadcrumbsFragment);
}

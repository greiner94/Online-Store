interface PromoDiscount {
    value: string;
    description: string;
    discount: number;
}
export function promocode() {
    const promoInput = document.querySelector('.summary__input') as HTMLInputElement;
    promoInput.addEventListener('input', checkPromo);
    renderDiscounts();
}
export function checkPromo(event: Event) {
    const promoCodes: PromoDiscount[] = [
        {
            value: 'RS',
            description: 'Rolling Scopes School',
            discount: 10,
        },
        {
            value: 'EPM',
            description: 'EPAM Systems',
            discount: 15,
        },
    ];
    const target = event.target as HTMLInputElement;
    document.querySelector('.summary__promo__msg')?.remove();
    document.querySelector('.summary__promo__btn')?.remove();
    promoCodes.forEach((promoCode) => {
        if (target.value.toLowerCase() == promoCode.value.toLowerCase()) {
            let messageHtml = `<span class="summary__promo__msg">${promoCode.description} - ${promoCode.discount}%</span>`;
            if (!isPromoActivated(promoCode)) {
                messageHtml += `<button class="summary__promo__btn">Add</button>`;
            }
            target.insertAdjacentHTML('afterend', messageHtml);

            const promoBtn = document.querySelector('.summary__promo__btn') as HTMLButtonElement;
            promoBtn?.addEventListener('click', (event) => activateDiscrount(promoCode, event));
        }
    });
}

function activateDiscrount(promoCode: PromoDiscount, event: Event) {
    const target = event.target as HTMLElement;
    target.remove();

    if (!localStorage.getItem('promo')) {
        localStorage.setItem('promo', JSON.stringify([promoCode]));
    } else {
        const promoArr: PromoDiscount[] = JSON.parse(localStorage.getItem('promo') || '');
        localStorage.setItem('promo', JSON.stringify([...promoArr, promoCode]));
    }
    renderDiscounts();
    chageTatalPrice();
}

function isPromoActivated(promoCode: PromoDiscount) {
    if (!localStorage.getItem('promo')) {
        return false;
    } else {
        const promoArr: PromoDiscount[] = JSON.parse(localStorage.getItem('promo') || '');
        return promoArr.some((promo) => promo.value == promoCode.value);
    }
}

function renderDiscounts() {
    if ((JSON.parse(localStorage.getItem('promo') || '[]') as []).length != 0) {
        document.querySelector('.applied-codes')?.remove();
        const promos: PromoDiscount[] = JSON.parse(localStorage.getItem('promo') || '');
        let PromoHtml = '';
        promos.forEach(({ description, discount, value }) => {
            PromoHtml += `<div class="applied-promo">
                            ${description} - ${discount}% - <span data-promo-value=${value}>remove</span>
                          </div>`;
        });
        const discountBlock = `<div class="applied-codes">
                                  <h3>Applied codes</h3>
                                  ${PromoHtml}
                              </div>`;
        const promoInput = document.querySelector('.summary__input') as HTMLInputElement;
        promoInput.insertAdjacentHTML('beforebegin', discountBlock);

        const removeBtns = document.querySelectorAll('.applied-promo span') as NodeListOf<HTMLElement>;
        removeBtns.forEach((removeBtn) => removeBtn.addEventListener('click', (event) => removeDiscount(event)));
    }
}

function removeDiscount(event: Event) {
    const promos: PromoDiscount[] = JSON.parse(localStorage.getItem('promo') || '');
    const target = event.target as HTMLElement;
    const targetValue = target.getAttribute('data-promo-value');

    const promosFilterd = promos.filter(({ value }) => value !== targetValue);
    localStorage.setItem('promo', JSON.stringify(promosFilterd));
    target.parentElement?.remove();

    if (!document.querySelector('.applied-promo')) {
        document.querySelector('.applied-codes')?.remove();
    }
    chageTatalPrice();
}

function chageTatalPrice() {
    document.querySelector('.summary__new-total-amount')?.remove();

    const oldPrice = document.querySelector('.summary__total-amount') as HTMLElement;
    const promos: PromoDiscount[] = JSON.parse(localStorage.getItem('promo') || '');
    const totalDiscount = promos.reduce((acc, curr) => acc + +curr.discount, 0);

    oldPrice.classList.add('summary__total-amount_remove');

    const newPriceValue = +(oldPrice.textContent || '0') - +(oldPrice.textContent || '0') * (totalDiscount / 100);
    const newPriceHtml = `<div class="summary__new-total-amount money">${newPriceValue}</div>`;

    oldPrice.insertAdjacentHTML('afterend', newPriceHtml);

    if ((JSON.parse(localStorage.getItem('promo') || '[]') as []).length == 0) {
        oldPrice.classList.remove('summary__total-amount_remove');
        document.querySelector('.summary__new-total-amount')?.remove();
    }
}

import visa from '../../../assets/img/card-visa.png';
import masterCard from '../../../assets/img/card-mastercard.png';
import express from '../../../assets/img/card-american-express.png';
import { mainPage } from '.';
import { getTotalCartSum } from './getLocalStorageParams';
import { displayHeaderCartAmount } from './addToCart';

export function modal() {
    renderModalPage();
    window.scrollTo(0, 0);
    if (document.querySelector('.summary__btn')) {
        const openModalBtn = document.querySelector('.summary__btn');
        const modalWrap = document.querySelector('.modal-wrap');
        const modalBg = document.querySelector('.blackout');

        modalBg?.addEventListener('click', () => {
            modalWrap?.classList.add('none');
        });

        openModalBtn?.addEventListener('click', () => {
            modalWrap?.classList.remove('none');
            window.scrollTo(0, 0);
        });

        const form = document.querySelector('.modal') as HTMLFormElement;
        form.addEventListener('submit', formValidation);

        phoneNumFormatEditor();
        cardFormEditor();
        validFormEditor();
        cvvFormEditor();
    }
}
export function formValidation(event: SubmitEvent) {
    event.preventDefault();

    const errorMessages = document.querySelectorAll('.form-error') as NodeListOf<HTMLElement>;
    errorMessages.forEach((message) => message.remove());

    nameValidate();
    phoneValidate();
    deliveryValidate();
    emailValidate();
    cardValidate();
    validValidate();
    cvvValidate();

    if (!document.querySelector('.form-error')) {
        showSuccessOrder();
        window.scrollTo(0, 0);
    }
}
function nameValidate() {
    const id = 'person-name';
    const nameInput = document.querySelector('#person-name') as HTMLInputElement;
    nameInput.addEventListener('change', () => {
        nameValidate();
    });
    const inputValue = nameInput.value;
    if (inputValue.includes(' ')) {
        const [name, surname] = inputValue.split(' ');
        if (name.length > 2 && surname.length > 2) {
            removeError(id);
            return;
        }
    } else if (!checkError(id)) {
        showError(nameInput, id);
    }
}
function phoneValidate() {
    const id = 'person-number';
    const phoneInput = document.querySelector('#person-number') as HTMLInputElement;
    const phoneValue = phoneInput.value;
    phoneInput.addEventListener('change', phoneValidate);
    if (phoneValue.length < 10) {
        if (!checkError(id)) {
            const errorMessage = 'Your phone number more than 10 number';
            showError(phoneInput, id, 'beforebegin', errorMessage);
        }
    } else {
        removeError(id);
    }
}
function deliveryValidate() {
    const id = 'delivery-address';
    const deliveryInput = document.querySelector(`#${id}`) as HTMLInputElement;
    deliveryInput.addEventListener('change', deliveryValidate);
    const deliveryValue = deliveryInput.value;
    const deliveryArr = deliveryValue.split(' ');
    if (deliveryArr.length < 3 || deliveryArr.some((word) => word.length < 5)) {
        if (!checkError(id)) {
            const errorMessage = 'Example: 12-25 st.King Cambridge CB11AH England';
            showError(deliveryInput, id, 'beforebegin', errorMessage);
        }
    } else {
        removeError(id);
    }
}
function emailValidate(): void {
    const id = 'email';
    const emailInput = document.querySelector(`#${id}`) as HTMLInputElement;
    emailInput.addEventListener('change', emailValidate);
    const emailValue = emailInput.value;
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(emailValue)) {
        if (!checkError(id)) {
            showError(emailInput, id);
        }
    } else {
        removeError(id);
    }
}
function cardValidate(): void {
    const id = 'card-number';
    const cardInput = document.querySelector(`#${id}`) as HTMLInputElement;
    cardInput.addEventListener('change', cardValidate);
    if (cardInput.value.length != 19) {
        if (!checkError(id)) {
            const errorMessage = 'Enter 18 number';
            showError(cardInput, id, 'beforebegin', errorMessage);
        }
    } else {
        removeError(id);
    }
}
function cardFormEditor() {
    const cardInput = document.querySelector('#card-number') as HTMLInputElement;

    cardInput.addEventListener('input', (event: Event) => {
        const cardValue = cardInput.value;
        const inputEvent = event as InputEvent;
        const inputLetter = inputEvent.data || '';
        if (/\D/.test(inputLetter)) {
            cardInput.value = cardValue.replace(inputLetter, '');
        }
        if (inputEvent.inputType != 'deleteContentBackward') {
            switch (cardValue.length) {
                case 4:
                    cardInput.value += ' ';
                    break;
                case 9:
                    cardInput.value += ' ';
                    break;
                case 14:
                    cardInput.value += ' ';
                    break;
            }
        }
        if (cardValue.length > 19) {
            cardInput.value = cardValue.slice(0, -1);
        }

        insertBankCardImage(cardInput, cardValue);
    });
}

function insertBankCardImage(cardInput: Element, cardNumber: string) {
    document.querySelector('.card-image')?.remove();
    const cardImage = document.createElement('img');
    cardImage.classList.add('card-image');
    switch (+cardNumber[0]) {
        case 4:
            cardImage.src = visa;
            break;
        case 5:
            cardImage.src = masterCard;
            break;
        case 3:
            cardImage.src = express;
            break;
    }
    cardInput.insertAdjacentElement('afterend', cardImage);
}

function phoneNumFormatEditor() {
    const phoneInput = document.querySelector('#person-number') as HTMLInputElement;
    phoneInput.addEventListener('input', (event: Event) => {
        const phoneValue = phoneInput.value;
        if (phoneValue[0] != '+') {
            phoneInput.value = '+' + phoneValue;
        }
        const inputEvent = event as InputEvent;
        const inputLetter = inputEvent.data || '';
        if (/\D/.test(inputLetter)) {
            phoneInput.value = phoneValue.replace(inputLetter, '');
        }
    });
}

function validFormEditor() {
    const validInput = document.querySelector('#valid') as HTMLInputElement;

    validInput.addEventListener('input', (event: Event) => {
        const validValue = validInput.value;
        const inputEvent = event as InputEvent;
        const inputLetter = inputEvent.data || '';
        if (/\D/.test(inputLetter)) {
            validInput.value = validValue.replace(inputLetter, '');
        }
        if (inputEvent.inputType != 'deleteContentBackward' && validValue.length == 2) {
            validInput.value += '/';
        }
        if (validValue.length > 5) {
            validInput.value = validValue.slice(0, -1);
        }
    });
}

function validValidate() {
    const id = 'valid';
    const validInput = document.querySelector(`#${id}`) as HTMLInputElement;
    validInput.addEventListener('change', validValidate);
    if (+validInput.value.split('/')[0] > 12 || validInput.value.length != 5) {
        if (!checkError(id)) {
            const errorMessage = 'mm/yy';
            showError(validInput, id, 'afterend', errorMessage);
        }
    } else {
        removeError(id);
    }
}

function cvvFormEditor() {
    const validInput = document.querySelector('#cvv') as HTMLInputElement;
    validInput.addEventListener('input', (event: Event) => {
        if (validInput.value.length > 3) {
            validInput.value = validInput.value.slice(0, -1);
        }
        const inputEvent = event as InputEvent;
        const inputLetter = inputEvent.data || '';
        if (/\D/.test(inputLetter)) {
            validInput.value = validInput.value.replace(inputLetter, '');
        }
    });
}

function cvvValidate() {
    const id = 'cvv';
    const validInput = document.querySelector(`#${id}`) as HTMLInputElement;
    validInput.addEventListener('change', cvvValidate);
    if (validInput.value.length != 3) {
        if (!checkError(id)) {
            const errorMessage = '000';
            showError(validInput, id, 'afterend', errorMessage);
        }
    } else {
        removeError(id);
    }
}
function checkError(inputId: string): boolean {
    const errors: NodeListOf<HTMLElement> = document.querySelectorAll('.form-error');
    const currentError = Array.from(errors).find((el) => el.dataset.id === inputId);
    return typeof currentError !== 'undefined';
}

function showError(elem: HTMLElement, elemId: string, position: InsertPosition = 'beforebegin', errorMessage = '') {
    errorMessage = errorMessage ? errorMessage : 'Field is not valid';
    errorMessage = `<div class="form-error" data-id="${elemId}">${errorMessage}</div>`;
    elem.insertAdjacentHTML(position, errorMessage);
    elem.style.background = 'transparent';
    elem.style.border = '1px solid red';
}
function removeError(inputId: string): void {
    const errorEl: NodeListOf<HTMLElement> = document.querySelectorAll('.form-error');
    const currentError = Array.from(errorEl).find((el) => {
        return el.dataset.id === inputId;
    });
    currentError?.remove();
    correctField(inputId);
}
function correctField(inputId: string) {
    const currentInput = <HTMLInputElement>document.querySelector(`#${inputId}`);
    currentInput.style.border = '1px solid #25a53c';
}

function showSuccessOrder() {
    const modal = document.querySelector('.modal') as HTMLElement;
    const successMessage = document.createElement('form');
    successMessage.classList.add('modal', 'modal_success');
    successMessage.textContent = 'Thank you for your order!';
    modal.parentElement?.appendChild(successMessage);
    modal.style.display = 'none';
    setTimeout(() => {
        localStorage.setItem('cart', '[]');
        localStorage.setItem('promo', '[]');
        localStorage.setItem('all-amount', '0');
        modal.style.display = 'flex';
        const modalWrap = document.querySelector('.modal-wrap') as HTMLElement;
        modalWrap.remove();
        redirectToMain();
    }, 1500);
}
function redirectToMain() {
    const url = new URL(window.location.href);
    const searchParams = <URLSearchParams>url.searchParams;
    searchParams.delete('product');
    window.history.pushState({}, '', url);
    const headerTotalSum = <HTMLElement>document.querySelector('.cart-total__sum');
    headerTotalSum.textContent = getTotalCartSum().toString();
    displayHeaderCartAmount(0);
    const productPageElem = document.querySelector('.main') as HTMLElement;
    productPageElem.remove();
    mainPage();
}
function renderModalPage() {
    const modal = document.createElement('div');
    modal.classList.add('modal-wrap', 'none');
    modal.innerHTML = `
    <div class="blackout"></div>
    <form class="modal">
      <h2>Personal details</h2>
      <input type="text" name="first-name" id="person-name" placeholder="Surname Name">
      <input type="tel" name="phone-number" id="person-number" placeholder="Phone number">
      <input type="text" name="delivery-address" id="delivery-address" placeholder="Delivery address">
      <input type="text" name="email" id="email" placeholder="E-mail">
      <h3>Credit cards details</h3>
      <div>
        <div class="credit-card-wrap">
          <input type="text" name="card-number" id="card-number" placeholder="Card number">
          <div class="valid-line">
            <div class="valid-wrap">
              <label for="valid">Valid:</label>
              <input type="text" name="valid" id="valid" placeholder="Valid Thru">
            </div>
            <div class="cvv-wrap">
              <label for="cvv" class="label-cvv">CVV:</label>
              <input type="number" name="cvv" id="cvv" placeholder="Code">
            </div>                     
          </div>
        </div>
      </div>
      <button type="submit" class="modal__submit">Confirm</button>
    </form>
    `;
    document.querySelector('.all-wrapper')?.insertAdjacentElement('afterbegin', modal);
}

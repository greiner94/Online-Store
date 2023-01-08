import visa from '../../../assets/img/card-visa.png';
import masterCard from '../../../assets/img/card-mastercard.png';
import express from '../../../assets/img/card-american-express.png';

export function modal() {
    renderModalPage();
    if (document.querySelector('.summary__btn')) {
        const openModalBtn = document.querySelector('.summary__btn');
        const modalWrap = document.querySelector('.modal-wrap');
        const modalBg = document.querySelector('.blackout');

        modalBg?.addEventListener('click', () => {
            modalWrap?.classList.add('none');
        });

        openModalBtn?.addEventListener('click', () => {
            modalWrap?.classList.remove('none');
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
    }
}
function nameValidate() {
    const nameInput = document.querySelector('#person-name') as HTMLInputElement;
    const inputValue = nameInput.value;
    if (inputValue.includes(' ')) {
        const [name, surname] = inputValue.split(' ');
        if (name.length > 2 && surname.length > 2) {
            return;
        }
    }
    showError(nameInput);
}
function phoneValidate() {
    const phoneInput = document.querySelector('#person-number') as HTMLInputElement;
    const phoneValue = phoneInput.value;

    if (phoneValue.length < 10) {
        showError(phoneInput);
    }
}
function deliveryValidate() {
    const deliveryInput = document.querySelector('#delivery-address') as HTMLInputElement;
    const deliveryValue = deliveryInput.value;
    const deliveryArr = deliveryValue.split(' ');
    if (deliveryArr.length < 3 || deliveryArr.some((word) => word.length < 5)) {
        showError(deliveryInput);
    }
}
function emailValidate() {
    const emailInput = document.querySelector('#email') as HTMLInputElement;
    const emailValue = emailInput.value;
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(emailValue)) {
        showError(emailInput);
    }
}
function cardValidate() {
    const cardInput = document.querySelector('#card-number') as HTMLInputElement;
    if (cardInput.value.length != 19) {
        showError(cardInput);
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
    const validInput = document.querySelector('#valid') as HTMLInputElement;
    if (+validInput.value.split('/')[0] > 12 || validInput.value.length != 5) {
        showError(validInput, 'afterend');
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
    const validInput = document.querySelector('#cvv') as HTMLInputElement;
    if (validInput.value.length != 3) {
        showError(validInput, 'afterend');
    }
}

function showError(elem: HTMLElement, position: InsertPosition = 'beforebegin') {
    const innerHtml = '<div class="form-error"> Field is not valid </div>';
    elem.insertAdjacentHTML(position, innerHtml);
}

function showSuccessOrder() {
    const modal = document.querySelector('.modal') as HTMLElement;
    const successMessage = document.createElement('form');
    successMessage.classList.add('modal', 'modal_success');
    successMessage.textContent = 'Thank you for youre order!';
    modal.parentElement?.appendChild(successMessage);
    modal.style.display = 'none';

    setTimeout(() => {
        document.querySelector('.modal_success')?.remove();
        modal.style.display = 'flex';
        const modalWrap = document.querySelector('.modal-wrap') as HTMLElement;
        modalWrap.classList.add('none');
        localStorage.setItem('cart', '[]');
        localStorage.setItem('promo', '[]');
        localStorage.setItem('all-amount', '0');
        window.location.replace('./');
    }, 3000);
}

function renderModalPage() {
    const modal = document.createElement('div');
    modal.classList.add('modal-wrap', 'none');
    modal.innerHTML = `
    <div class="blackout"></div>
    <form class="modal">
      <h2>Personal details</h2>
      <input type="text" name="first-name" id="person-name" placeholder="Name">
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

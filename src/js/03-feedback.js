import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'feedback-form-state';
const feedbackForm = document.querySelector('.feedback-form');
const { email, message } = feedbackForm.elements;

const localStorageObj = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

chackedLocalStorage();

feedbackForm.addEventListener('input', throttle(onValueInput, 500));
feedbackForm.addEventListener('submit', onSubmit);

function onValueInput() {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(currentValuesObj()));
}
function onSubmit(e) {
  e.preventDefault();

  const { value: emailValue } = email;
  const { value: messageValue } = message;

  if (emailValue === '') {
    email.classList.add('accent');
    email.setAttribute('placeholder', 'Enter your email');
  }
  if (emailValue !== '') {
    if (email.classList.contains('accent')) {
      email.classList.remove('accent');
    }
    if (email.hasAttribute('placeholder')) {
      email.removeAttribute('placeholder');
    }
  }

  if (messageValue === '') {
    message.classList.add('accent');
    message.setAttribute('placeholder', 'Enter your message');
  }
  if (messageValue !== '') {
    if (message.classList.contains('accent')) {
      message.classList.remove('accent');
    }
    if (message.hasAttribute('placeholder')) {
      message.removeAttribute('placeholder');
    }

    if (messageValue !== '' && emailValue !== '') {
      console.log(currentValuesObj());
      feedbackForm.reset();
      localStorage.removeItem(LOCALSTORAGE_KEY);
    }
  }
}

function chackedLocalStorage() {
  if (localStorageObj === null) {
    return;
  }
  if (localStorageObj.message || localStorageObj.email !== '') {
    email.value = localStorageObj.email;
    message.value = localStorageObj.message;
  }
}

function currentValuesObj() {
  return {
    email: email.value,
    message: message.value,
  };
}

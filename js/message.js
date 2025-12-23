import { isEscapeKey } from './utils.js';

const body = document.querySelector('body');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const showMessage = (template, closeButtonSelector, innerSelector, message = null) => {
  const existingMessage = body.querySelector('.success, .error');
  if (existingMessage) {
    existingMessage.remove();
  }

  const element = template.cloneNode(true);

  if (message) {
    const titleElement = element.querySelector('h2');
    if (titleElement) {
      titleElement.textContent = message;
    }
  }

  const closeMessage = () => {
    element.remove();
    document.removeEventListener('keydown', onEscapeKeydown);
    document.removeEventListener('click', onOutsideClick);
  };

  function onEscapeKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeMessage();
    }
  }

  function onOutsideClick(evt) {
    if (!evt.target.closest(innerSelector)) {
      closeMessage();
    }
  }

  const closeButton = element.querySelector(closeButtonSelector);
  closeButton.addEventListener('click', closeMessage);

  body.appendChild(element);

  setTimeout(() => {
    closeButton.focus();
  }, 100);

  document.addEventListener('keydown', onEscapeKeydown);
  document.addEventListener('click', onOutsideClick);
};


const showSuccessMessage = () => {
  showMessage(successTemplate, '.success__button', '.success__inner');
};

const showErrorMessage = (message = null) => {
  showMessage(errorTemplate, '.error__button', '.error__inner', message);
};

export { showSuccessMessage, showErrorMessage };

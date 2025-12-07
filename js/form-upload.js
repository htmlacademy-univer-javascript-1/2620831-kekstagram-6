import { isEscapeKey } from './utils.js';
import { resetFormValidation, initFormValidation } from './form-validation.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');


const isTextFieldFocused = () =>
  document.activeElement === textHashtags || document.activeElement === textDescription;


const closeForm = () => {
  imgUploadForm.reset();
  imgUploadInput.value = '';
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetFormValidation();
};

const openForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  initFormValidation();
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeForm();
  }
}

imgUploadInput.addEventListener('change', openForm);
imgUploadCancel.addEventListener('click', closeForm);

export { openForm, closeForm };

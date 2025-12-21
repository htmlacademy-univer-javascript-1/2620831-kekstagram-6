import { isEscapeKey } from './utils.js';
import { initFormValidation, resetFormValidation, unblockSubmitButton } from './form-validation.js';
import { initScaleControl, destroyScaleControl, resetScale } from './scale-control.js';
import { initImageEffects, destroyEffects, resetEffects } from './image-effects.js';
import { showErrorMessage } from './message.js';


const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');
const previewImage = document.querySelector('.img-upload__preview img');
const defaultImageSrc = 'img/upload-default-image.jpg';
const effectsPreview = document.querySelectorAll('.effects__preview');

const isTextFieldFocused = () =>
  document.activeElement === textHashtags || document.activeElement === textDescription;

const resetFormToInitialState = () => {
  imgUploadForm.reset();

  imgUploadInput.value = '';

  previewImage.src = defaultImageSrc;
  previewImage.style.transform = 'scale(1)';
  previewImage.style.filter = 'none';

  previewImage.className = '';
  previewImage.classList.add('img-upload__preview', 'effects__preview--none');

  effectsPreview.forEach((preview) => {
    preview.className = 'effects__preview';
    preview.classList.add('effects__preview--none');
  });

  const originalEffectRadio = document.querySelector('#effect-none');
  if (originalEffectRadio) {
    originalEffectRadio.checked = true;
  }

  textHashtags.value = '';
  textDescription.value = '';

  unblockSubmitButton();
};

const closeForm = () => {
  resetFormToInitialState();

  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);

  resetFormValidation();

  destroyScaleControl();
  resetScale();

  destroyEffects();
  resetEffects();
};

const isValidFileType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((type) => fileName.endsWith(type));
};

const openForm = () => {
  const file = imgUploadInput.files[0];

  if (!file) {
    return;
  }

  if (!isValidFileType(file)) {
    imgUploadInput.value = '';

    showErrorMessage('Пожалуйста, выберите изображение в формате GIF, JPEG или PNG');
    return;
  }

  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  initFormValidation();
  initScaleControl();
  initImageEffects();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeForm();
  }
}

const initFormUpload = () => {
  imgUploadInput.addEventListener('change', openForm);
  imgUploadCancel.addEventListener('click', closeForm);
};

export { initFormUpload, closeForm };

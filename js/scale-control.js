const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const DEFAULT_SCALE = 100;

const scaleControlValue = document.querySelector('.scale__control--value');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const imagePreview = document.querySelector('.img-upload__preview img');
const imgUploadForm = document.querySelector('.img-upload__form');

let currentScale = DEFAULT_SCALE;
let hiddenScaleInput;

const updateScale = () => {
  scaleControlValue.value = `${currentScale}%`;
  imagePreview.style.transform = `scale(${currentScale / 100})`;

  if (!hiddenScaleInput) {
    hiddenScaleInput = document.createElement('input');
    hiddenScaleInput.type = 'hidden';
    hiddenScaleInput.name = 'scale';
    imgUploadForm.appendChild(hiddenScaleInput);
  }
  hiddenScaleInput.value = currentScale;
};

const onScaleSmallerClick = () => {
  currentScale = Math.max(SCALE_MIN, currentScale - SCALE_STEP);
  updateScale();
};

const onScaleBiggerClick = () => {
  currentScale = Math.min(SCALE_MAX, currentScale + SCALE_STEP);
  updateScale();
};

const resetScale = () => {
  currentScale = DEFAULT_SCALE;
  updateScale();
};

const initScaleControl = () => {
  scaleSmaller.addEventListener('click', onScaleSmallerClick);
  scaleBigger.addEventListener('click', onScaleBiggerClick);
  resetScale();
};

const destroyScaleControl = () => {
  scaleSmaller.removeEventListener('click', onScaleSmallerClick);
  scaleBigger.removeEventListener('click', onScaleBiggerClick);
};

export { initScaleControl, destroyScaleControl, resetScale };

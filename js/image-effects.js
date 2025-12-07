
const EFFECTS = {
  none: { filter: '', min: 0, max: 100, step: 1, unit: '', className: 'effects__preview--none' },
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '', className: 'effects__preview--chrome' },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '', className: 'effects__preview--sepia' },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%', className: 'effects__preview--marvin' },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px', className: 'effects__preview--phobos' },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '', className: 'effects__preview--heat' }
};

const imagePreview = document.querySelector('.img-upload__preview img');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectsList = document.querySelector('.effects__list');
const imgUploadForm = document.querySelector('.img-upload__form');

let currentEffect = 'none';
let hiddenEffectInput;
let hiddenEffectLevelInput;

noUiSlider.create(effectLevelSlider, {
  range: { min: 0, max: 100 },
  start: 100,
  step: 1,
  connect: 'lower'
});

const createHiddenInputs = () => {
  hiddenEffectInput = imgUploadForm.querySelector('input[name="effect"]');
  hiddenEffectLevelInput = imgUploadForm.querySelector('input[name="effect-level"]');

  if (!hiddenEffectInput) {
    hiddenEffectInput = document.createElement('input');
    hiddenEffectInput.type = 'hidden';
    hiddenEffectInput.name = 'effect';
    imgUploadForm.appendChild(hiddenEffectInput);
  }

  if (!hiddenEffectLevelInput) {
    hiddenEffectLevelInput = document.createElement('input');
    hiddenEffectLevelInput.type = 'hidden';
    hiddenEffectLevelInput.name = 'effect-level';
    imgUploadForm.appendChild(hiddenEffectLevelInput);
  }
};

const updateSliderOptions = (effect) => {
  const effectData = EFFECTS[effect];
  effectLevelSlider.noUiSlider.updateOptions({
    range: { min: effectData.min, max: effectData.max },
    start: effectData.max,
    step: effectData.step
  });
};

const updateImageClasses = (effect) => {
  Object.values(EFFECTS).forEach((effectData) => {
    imagePreview.classList.remove(effectData.className);
  });

  imagePreview.classList.add(EFFECTS[effect].className);
};

const applyEffect = (effect, value) => {
  const effectData = EFFECTS[effect];

  updateImageClasses(effect);

  if (effect === 'none') {
    imagePreview.style.filter = 'none';
    effectLevelContainer.classList.add('hidden');
  } else {
    effectLevelContainer.classList.remove('hidden');
    imagePreview.style.filter = `${effectData.filter}(${value}${effectData.unit})`;
  }

  hiddenEffectInput.value = effect;
  hiddenEffectLevelInput.value = value;
  effectLevelValue.value = value;
};

const onSliderUpdate = () => {
  const sliderValue = effectLevelSlider.noUiSlider.get();
  applyEffect(currentEffect, sliderValue);
};

const onEffectChange = (evt) => {
  if (evt.target.type === 'radio') {
    currentEffect = evt.target.value;
    updateSliderOptions(currentEffect);
    applyEffect(currentEffect, EFFECTS[currentEffect].max);
  }
};


const resetEffects = () => {
  currentEffect = 'none';
  effectLevelSlider.noUiSlider.set(100);
  applyEffect('none', 100);
};

const destroyEffects = () => {
  effectLevelSlider.noUiSlider.off('update');
  effectsList.removeEventListener('change', onEffectChange);
};

const initImageEffects = () => {
  createHiddenInputs();

  effectLevelSlider.noUiSlider.on('update', onSliderUpdate);
  effectsList.addEventListener('change', onEffectChange);

  resetEffects();
};

export { initImageEffects, destroyEffects, resetEffects };

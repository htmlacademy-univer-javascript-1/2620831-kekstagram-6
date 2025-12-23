const EFFECTS = {
  none: { filter: '', min: 0, max: 100, step: 1, unit: '', className: 'effects__preview--none' },
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '', className: 'effects__preview--chrome' },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '', className: 'effects__preview--sepia' },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%', className: 'effects__preview--marvin' },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px', className: 'effects__preview--phobos' },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '', className: 'effects__preview--heat' }
};

const DEFAULT_EFFECT = 'none';
let chosenEffect = DEFAULT_EFFECT;

const imagePreview = document.querySelector('.img-upload__preview img');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectsElement = document.querySelector('.effects');
const effectsPreviews = document.querySelectorAll('.effects__preview');

let isInitialized = false;

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const showSlider = () => {
  effectLevelContainer.classList.remove('hidden');
};

const hideSlider = () => {
  effectLevelContainer.classList.add('hidden');
};

const updateEffectsPreviews = (imageUrl) => {
  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url("${imageUrl}")`;
  });
};

const updateSlider = () => {
  const effectData = EFFECTS[chosenEffect];

  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: effectData.min,
      max: effectData.max,
    },
    start: effectData.max,
    step: effectData.step,
  });

  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

const onSliderUpdate = () => {
  const sliderValue = effectLevelSlider.noUiSlider.get();
  const effectData = EFFECTS[chosenEffect];

  if (isDefault()) {
    imagePreview.style.filter = EFFECTS[DEFAULT_EFFECT].filter;
  } else {
    imagePreview.style.filter = `${effectData.filter}(${sliderValue}${effectData.unit})`;
  }

  effectLevelValue.value = parseFloat(sliderValue);
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  chosenEffect = evt.target.value;
  imagePreview.className = `effects__preview--${chosenEffect}`;
  updateSlider();
  onSliderUpdate();
};

const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;

  const defaultRadio = effectsElement.querySelector('#effect-none');
  if (defaultRadio) {
    defaultRadio.checked = true;
  }

  imagePreview.className = `effects__preview--${DEFAULT_EFFECT}`;
  imagePreview.style.filter = EFFECTS[DEFAULT_EFFECT].filter;

  updateSlider();
  effectLevelSlider.noUiSlider.set(EFFECTS[DEFAULT_EFFECT].max);
  onSliderUpdate();
};

const destroyEffects = () => {
  if (isInitialized) {
    effectLevelSlider.noUiSlider.off('update');
    effectsElement.removeEventListener('change', onEffectsChange);
    isInitialized = false;
  }
};

const initImageEffects = () => {
  if (isInitialized) {
    destroyEffects();
  }

  if (!effectLevelSlider.noUiSlider) {
    noUiSlider.create(effectLevelSlider, {
      range: {
        min: EFFECTS[DEFAULT_EFFECT].min,
        max: EFFECTS[DEFAULT_EFFECT].max
      },
      start: EFFECTS[DEFAULT_EFFECT].max,
      step: EFFECTS[DEFAULT_EFFECT].step,
      connect: 'lower'
    });
  }

  hideSlider();

  effectsElement.addEventListener('change', onEffectsChange);
  effectLevelSlider.noUiSlider.on('update', onSliderUpdate);

  resetEffects();

  isInitialized = true;
};

const setEffectsPreviewImage = (imageUrl) => {
  updateEffectsPreviews(imageUrl);
};

export { initImageEffects, resetEffects, destroyEffects, setEffectsPreviewImage };

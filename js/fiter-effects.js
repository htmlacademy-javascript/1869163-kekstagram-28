const EFFECTS = [
  { name: 'none', style: 'none', min: 0, max: 100, step: 1, unit: '' },
  { name: 'chrome', style: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  { name: 'sepia', style: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  { name: 'marvin', style: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  { name: 'phobos', style: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  { name: 'heat', style: 'brightness', min: 1, max: 3, step: 0.1, unit: '' },
];

const DEFAULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFAULT_EFFECT;

const imgPreview = document.querySelector('.img-upload__preview img');
const effectRadioButtons = document.querySelectorAll('.effects__radio');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');

valueElement.value = 100;

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
  sliderElement.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
  sliderElement.classList.add('hidden');
};

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    start: chosenEffect.max,
    step: chosenEffect.step,
  });

  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  imgPreview.style.filter = isDefault()
    ? DEFAULT_EFFECT.style
    : `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  valueElement.value = sliderValue;
};

const onEffectRadioButtonClick = (radioButton) => {
  imgPreview.className = '';
  const currentFilter = `effects__preview--${radioButton.value}`;
  imgPreview.classList.add(currentFilter);

  chosenEffect = EFFECTS.find((effect) => effect.name === radioButton.value);

  updateSlider();
};

effectRadioButtons.forEach((radioButton) =>
  radioButton.addEventListener('click', () =>
    onEffectRadioButtonClick(radioButton)
  )
);

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});
hideSlider();

sliderElement.noUiSlider.on('update', onSliderUpdate);

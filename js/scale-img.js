import { DEFAULT_SCALE_VALUE } from './util.js';

const SCALE_STEP = 25;
const SCALE_COEFFICIENT_75_PERCENT = 3;
const SCALE_COEFFICIENT_50_PERCENT = 2;

const editorForm = document.querySelector('.img-upload__overlay');
const imgPreview = editorForm.querySelector('.img-upload__preview img');
const scaleInput = editorForm.querySelector('.scale__control--value');
const scaleButtonSmaller = editorForm.querySelector('.scale__control--smaller');
const scaleButtonBigger = editorForm.querySelector('.scale__control--bigger');

let scaleValueNumber = DEFAULT_SCALE_VALUE;

const updateScaleInput = () => (scaleInput.value = `${scaleValueNumber}%`);

updateScaleInput();

const scaleImg = () => {
  imgPreview.style.transform = `scale(${
    Number(scaleValueNumber) / DEFAULT_SCALE_VALUE
  })`;
};

const onScaleButtonClick = (isIncrement) => {
  if (
    (!isIncrement &&
      Number(scaleValueNumber) < SCALE_STEP * SCALE_COEFFICIENT_50_PERCENT) ||
    (isIncrement &&
      Number(scaleValueNumber) > SCALE_STEP * SCALE_COEFFICIENT_75_PERCENT)
  ) {
    return;
  }

  scaleValueNumber =
    Number(scaleValueNumber) + (isIncrement ? SCALE_STEP : -1 * SCALE_STEP);
  updateScaleInput();
  scaleImg();
};

const resetScale = () => {
  scaleValueNumber = DEFAULT_SCALE_VALUE;
  scaleImg();
  updateScaleInput();
};

scaleButtonSmaller.addEventListener('click', () => onScaleButtonClick(false));
scaleButtonBigger.addEventListener('click', () => onScaleButtonClick(true));

export { resetScale };

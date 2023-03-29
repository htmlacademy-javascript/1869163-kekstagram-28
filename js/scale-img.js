const SCALE_STEP = 25;
const DEFAULT_SCALE_VALUE = 100;

let scaleValueNumber = DEFAULT_SCALE_VALUE;

const editorForm = document.querySelector('.img-upload__overlay');
const imgPreview = editorForm.querySelector('.img-upload__preview img');
const scaleInput = editorForm.querySelector('.scale__control--value');
const scaleButtonSmaller = editorForm.querySelector('.scale__control--smaller');
const scaleButtonBigger = editorForm.querySelector('.scale__control--bigger');

const updateScaleInput = () => (scaleInput.value = `${scaleValueNumber}%`);

updateScaleInput();

const scaleImg = () => {
  imgPreview.style.transform = `scale(${Number(scaleValueNumber) / 100})`;
};

const onSmallerButtonClick = () => {
  if (Number(scaleValueNumber) < SCALE_STEP * 2) {
    return;
  }
  scaleValueNumber = Number(scaleValueNumber) - SCALE_STEP;
  updateScaleInput();
  scaleImg();
};

const onBiggerButtonClick = () => {
  if (Number(scaleValueNumber) > SCALE_STEP * 3) {
    return;
  }
  scaleValueNumber = Number(scaleValueNumber) + SCALE_STEP;
  updateScaleInput();
  scaleImg();
};

const resetScale = () => {
  scaleValueNumber = DEFAULT_SCALE_VALUE;
  imgPreview.style.transform = `scale(${Number(scaleValueNumber) / 100})`;
  updateScaleInput();
};

scaleButtonSmaller.addEventListener('click', onSmallerButtonClick);
scaleButtonBigger.addEventListener('click', onBiggerButtonClick);

export { resetScale };

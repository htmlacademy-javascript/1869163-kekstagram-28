import { postData } from './api.js';
import { resetEffects } from './fiter-effects.js';
import { resetScale } from './scale-img.js';
import { isEscapeKey } from './util.js';

const HASHTAG_ERROR_TEXT = 'Неправильный формат хештегов';
const VALID_FORMAT = /^(#[а-яА-Я\w]{1,19}( +#[а-яА-Я\w]{1,19}){0,4})?$/i;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...',
};

const body = document.body;
const imgUploadWindow = document.querySelector('.img-upload');
const imgUploadInput = imgUploadWindow.querySelector('#upload-file');
const imgEditor = imgUploadWindow.querySelector('.img-upload__overlay');
const imgEditorCloseElement = imgUploadWindow.querySelector('#upload-cancel');
const form = imgUploadWindow.querySelector('.img-upload__form');
const hashtagsInput = imgUploadWindow.querySelector('.text__hashtags');
const textArea = imgUploadWindow.querySelector('.text__description');
const submitButton = imgUploadWindow.querySelector('.img-upload__submit');
const errorModal = document.querySelector('.error');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const isValidHashtag = (inputValue) => VALID_FORMAT.test(inputValue);

const isUniqueHashtags = (hashtagsArray) => {
  const lowerCaseHashtags = hashtagsArray.map((hashtag) =>
    hashtag.toLowerCase()
  );
  return lowerCaseHashtags.length === new Set(lowerCaseHashtags).size;
};

const validate = (inputValue) => {
  const hashtagsArray = inputValue
    .split(' ')
    .filter((hashtag) => Boolean(hashtag));
  return isValidHashtag(inputValue) && isUniqueHashtags(hashtagsArray);
};

pristine.addValidator(hashtagsInput, validate, HASHTAG_ERROR_TEXT);

const onTextFieldKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onKeydown = (evt) => {
  if (errorModal) {
    return;
  }
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImgUploadWindow();
  }
};

imgUploadInput.addEventListener('change', () => {
  resetScale();
  pristine.validate();
  unblockSubmitButton();

  hashtagsInput.addEventListener('keydown', onTextFieldKeydown);
  textArea.addEventListener('keydown', onTextFieldKeydown);

  imgEditor.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onKeydown);
});

function closeImgUploadWindow() {
  imgEditor.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadInput.value = '';

  resetEffects();
  form.reset();

  document.removeEventListener('keydown', onKeydown);
  hashtagsInput.removeEventListener('keydown', onTextFieldKeydown);
  textArea.removeEventListener('keydown', onTextFieldKeydown);
}

imgEditorCloseElement.addEventListener('click', closeImgUploadWindow);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (!isValid) {
    return;
  }

  blockSubmitButton();
  const formData = new FormData(form);
  postData(formData);
});

export { closeImgUploadWindow, unblockSubmitButton };

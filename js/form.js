import { isEscapeKey } from './util.js';

const HASHTAG_ERROR_TEXT = 'Неправильный формат хештегов';
const VALID_FORMAT = /^(#[а-яА-Я\w]{1,19}( +#[а-яА-Я\w]{1,19}){0,4})?$/i;

const body = document.body;
const imgUploadWindow = document.querySelector('.img-upload');
const imgUploadInput = imgUploadWindow.querySelector('#upload-file');
const imgEditor = imgUploadWindow.querySelector('.img-upload__overlay');
const imgEditorCloseElement = imgUploadWindow.querySelector('#upload-cancel');
const form = imgUploadWindow.querySelector('.img-upload__form');
const hashtagField = imgUploadWindow.querySelector('.text__hashtags');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__field-wrapper--error',
});

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

pristine.addValidator(hashtagField, validate, HASHTAG_ERROR_TEXT);

const onHashtagFieldKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

hashtagField.addEventListener('keydown', onHashtagFieldKeydown);

const onKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImgUploadWindow();
  }
};

imgUploadInput.addEventListener('change', () => {
  imgEditor.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onKeydown);
});

function closeImgUploadWindow() {
  imgEditor.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadInput.value = '';

  document.removeEventListener('keydown', onKeydown);
  hashtagField.removeEventListener('keydown', onHashtagFieldKeydown);
}

imgEditorCloseElement.addEventListener('click', closeImgUploadWindow);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

import { isEscapeKey } from './util.js';
import { unblockSubmitButton } from './form.js';

const successModalTemplate = document
  .querySelector('#success')
  .content.querySelector('.success');

const errorModalTemplate = document
  .querySelector('#error')
  .content.querySelector('.error');

const successModalButton =
  successModalTemplate.querySelector('.success__button');
const errorModalButton = errorModalTemplate.querySelector('.error__button');

const successWindow = successModalTemplate.querySelector('.success__inner');
const errorWindow = errorModalTemplate.querySelector('.error__inner');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalError();
    closeModalSuccess();
  }
};

function closeModalError() {
  errorModalTemplate.remove();
  unblockSubmitButton();

  document.removeEventListener('keydown', onDocumentKeydown);
}

function closeModalSuccess() {
  successModalTemplate.remove();
  unblockSubmitButton();

  document.removeEventListener('keydown', onDocumentKeydown);
}

const showModalError = () => {
  document.body.append(errorModalTemplate);

  document.addEventListener('keydown', onDocumentKeydown);
};

const showModalSuccess = () => {
  document.body.append(successModalTemplate);

  document.addEventListener('keydown', onDocumentKeydown);
};

const onErrorModalClose = () => closeModalError(errorModalTemplate);
const onSuccessModalClose = () => closeModalSuccess(successModalTemplate);

successModalButton.addEventListener('click', onSuccessModalClose);
successModalTemplate.addEventListener('click', onSuccessModalClose);
successWindow.addEventListener('click', (evt) => {
  evt.stopPropagation();
});

errorModalButton.addEventListener('click', onErrorModalClose);
errorModalTemplate.addEventListener('click', onErrorModalClose);
errorWindow.addEventListener('click', (evt) => {
  evt.stopPropagation();
});

export {
  showModalError,
  showModalSuccess,
  successModalTemplate,
  errorModalTemplate,
};

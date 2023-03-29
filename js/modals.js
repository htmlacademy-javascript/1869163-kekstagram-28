import { isEscapeKey } from './util.js';

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

function closeModal(template) {
  template.remove();

  document.removeEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeModal(template);
    }
  });
}

const showModal = (template) => {
  document.body.append(template);

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeModal(template);
    }
  });
};

const onErrorModalClose = () => closeModal(errorModalTemplate);
const onSuccessModalClose = () => closeModal(successModalTemplate);

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

export { showModal, successModalTemplate, errorModalTemplate };

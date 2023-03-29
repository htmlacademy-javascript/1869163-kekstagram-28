import { updatePosts } from './data.js';
import { closeImgUploadWindow } from './form.js';
import {
  showModal,
  successModalTemplate,
  errorModalTemplate,
} from './modals.js';
import { showAlert } from './util.js';

const GET_URL = 'https://28.javascript.pages.academy/kekstagram/data';
const POST_URL = 'https://28.javascript.pages.academy/kekstagram/';

const initApp = () => {
  fetch(GET_URL)
    .then((response) => {
      if (!response.ok) {
        showAlert('DATA FETCHING ERROR');
      }
      return response.json();
    })
    .then((posts) => updatePosts(posts))
    .catch(() => showAlert('ERROR'));
};

const onSuccess = () => {
  closeImgUploadWindow();
  showModal(successModalTemplate);
};

const postData = (formData) => {
  fetch(POST_URL, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        showModal(errorModalTemplate);
      }
    })
    .catch(() => {
      showModal(errorModalTemplate);
    });
};

export { initApp, postData };

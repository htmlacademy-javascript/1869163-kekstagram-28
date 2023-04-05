import { updatePosts, updateInitPosts } from './data.js';
import { closeImgUploadWindow } from './form.js';
import { showPostsFilter } from './images-filter.js';
import { showModalSuccess, showModalError } from './modals.js';
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
    .then((posts) => {
      updateInitPosts(posts);
      updatePosts(posts);
      showPostsFilter();
    })
    .catch(() => showAlert('SOMETHING WENT WRONG TRY RELOADING THE PAGE'));
};

const onSuccess = () => {
  closeImgUploadWindow();
  showModalSuccess();
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
        showModalError();
      }
    })
    .catch(() => {
      showModalError();
    });
};

export { initApp, postData };

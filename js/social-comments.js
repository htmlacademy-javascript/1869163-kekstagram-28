const MAX_NUMBER_OF_COMMENTS = 5;
let numberOfComments = 0;
let currentCommentSection = 0;

const getIsLastSection = () =>
  currentCommentSection + 1 >=
  Math.ceil(numberOfComments / MAX_NUMBER_OF_COMMENTS);

const incrementCounterIndex = () => {
  if (getIsLastSection()) {
    return;
  }
  currentCommentSection++;
};

const resetCounter = () => {
  numberOfComments = 0;
  currentCommentSection = 0;
};

const initCounter = (comments) => {
  numberOfComments = comments.length;
};

const createSocialComment = (avatarUrl, name, text) => {
  const div = document.createElement('div');
  div.innerHTML = `<li class="social__comment">
    <img
        class="social__picture"
        src="${avatarUrl}"
        alt="${name}"
        width="35" height="35">
    <p class="social__text">${text}</p>
</li>`;
  return div.children[0];
};

export {
  createSocialComment,
  currentCommentSection,
  MAX_NUMBER_OF_COMMENTS,
  incrementCounterIndex,
  resetCounter,
  initCounter,
  getIsLastSection,
};

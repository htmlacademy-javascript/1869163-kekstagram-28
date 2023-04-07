const MAX_NUMBER_OF_COMMENTS = 5;
let numberOfComments = 0;
let currentCommentSection = 0;

const getCurrentCommentSection = () => currentCommentSection;

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
  const temporarySocialCommentWrapper = document.createElement('div');
  temporarySocialCommentWrapper.innerHTML = `<li class="social__comment">
    <img
        class="social__picture"
        src="${avatarUrl}"
        alt="${name}"
        width="35" height="35">
    <p class="social__text"></p>
</li>`;
  const socialComment = temporarySocialCommentWrapper.children[0];
  socialComment.querySelector('p').textContent = text;

  return socialComment;
};

export {
  createSocialComment,
  getCurrentCommentSection,
  MAX_NUMBER_OF_COMMENTS,
  incrementCounterIndex,
  resetCounter,
  initCounter,
  getIsLastSection,
};

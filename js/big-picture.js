import { isEscapeKey } from './util.js';
import { posts } from './data.js';
import {
  createSocialComment,
  currentCommentSection,
  MAX_NUMBER_OF_COMMENTS,
  resetCounter,
  incrementCounterIndex,
  initCounter,
  getIsLastSection,
} from './social-comments.js';

const body = document.body;
const bigPictureElement = document.querySelector('.big-picture');
const picturesBlock = document.querySelector('.pictures');
const bigPictureCloseElement = bigPictureElement.querySelector(
  '.big-picture__cancel'
);
const socialCommentCountStartSpan = bigPictureElement.querySelector(
  '.social__comment-count-start'
);

let post = null;

const openBigPicture = (url, likesCount, commentsCount, description) => {
  bigPictureElement.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likesCount;
  bigPictureElement.querySelector('.comments-count').textContent =
    commentsCount;
  bigPictureElement.querySelector('.social__caption').textContent = description;

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      bigPictureElement.classList.add('hidden');
      body.classList.remove('modal-open');
    }
  });
};

const updateComments = () => {
  const { url, likes, comments, description } = post;
  initCounter(comments);
  openBigPicture(url, likes, comments.length, description);

  const commentsUl = bigPictureElement.querySelector('.social__comments');
  const commentsLiCollection = post.comments
    .slice(
      currentCommentSection * MAX_NUMBER_OF_COMMENTS,
      (currentCommentSection + 1) * MAX_NUMBER_OF_COMMENTS
    )
    .map(({ avatar, name, message }) =>
      createSocialComment(avatar, name, message)
    );

  commentsUl.innerHTML = '';

  commentsUl.append(...commentsLiCollection);

  socialCommentCountStartSpan.textContent =
    (currentCommentSection + 1) * MAX_NUMBER_OF_COMMENTS +
    (getIsLastSection() ? comments.length % MAX_NUMBER_OF_COMMENTS : 0);
};

const onNextButtonClick = () => {
  incrementCounterIndex();
  updateComments();
};

const nextButton = bigPictureElement.querySelector('.social__comments-loader');
nextButton.addEventListener('click', onNextButtonClick);

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  body.classList.remove('modal-open');
  nextButton.removeEventListener('click', onNextButtonClick);
  post = null;
  resetCounter();
  socialCommentCountStartSpan.textContent = 5;

  document.removeEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      bigPictureElement.classList.add('hidden');
    }
  });
};

picturesBlock.addEventListener('click', (evt) => {
  const a = evt.target.closest('a');
  if (!a) {
    return;
  }
  post = posts[a.dataset.index];
  updateComments(post);
});

bigPictureCloseElement.addEventListener('click', () => {
  closeBigPicture();
});

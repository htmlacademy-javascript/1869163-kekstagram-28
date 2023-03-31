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
const bigPictureSection = document.querySelector('.big-picture');
const picturesBlock = document.querySelector('.pictures');
const bigPictureCloseElement = bigPictureSection.querySelector(
  '.big-picture__cancel'
);
const bigPictureImg = bigPictureSection.querySelector('.big-picture__img img');
const bigPictureLikesCount = bigPictureSection.querySelector('.likes-count');
const bigPictureCommentsCount =
  bigPictureSection.querySelector('.comments-count');
const bigPictureDescription =
  bigPictureSection.querySelector('.social__caption');
const commentsUl = bigPictureSection.querySelector('.social__comments');
const socialCommentCountStartSpan = bigPictureSection.querySelector(
  '.social__comment-count-start'
);
const nextButton = bigPictureSection.querySelector('.social__comments-loader');

let post = null;

const onNextButtonClick = () => {
  incrementCounterIndex();
  updateComments();
};

const onKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = (url, likesCount, commentsCount, description) => {
  bigPictureSection.classList.remove('hidden');
  nextButton.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureImg.src = url;
  bigPictureLikesCount.textContent = likesCount;
  bigPictureCommentsCount.textContent = commentsCount;
  bigPictureDescription.textContent = description;

  nextButton.addEventListener('click', onNextButtonClick);

  document.addEventListener('keydown', onKeydown);
};

function updateComments() {
  const { url, likes, comments, description } = post;
  initCounter(comments);
  openBigPicture(url, likes, comments.length, description);

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
    (getIsLastSection()
      ? (comments.length % MAX_NUMBER_OF_COMMENTS) - MAX_NUMBER_OF_COMMENTS
      : 0);

  if (getIsLastSection()) {
    nextButton.classList.add('hidden');
  }
}

function closeBigPicture() {
  bigPictureSection.classList.add('hidden');
  body.classList.remove('modal-open');
  nextButton.removeEventListener('click', onNextButtonClick);
  post = null;
  resetCounter();
  socialCommentCountStartSpan.textContent = 5;

  document.removeEventListener('keydown', onKeydown);
}

picturesBlock.addEventListener('click', (evt) => {
  const a = evt.target.closest('a');
  if (!a) {
    return;
  }
  post = posts[a.dataset.index];
  updateComments(post);
});

bigPictureCloseElement.addEventListener('click', closeBigPicture);

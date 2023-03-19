import { isEscapeKey } from './util.js';
import { posts } from './data.js';
import { createSocialComment } from './social-comments.js';

const body = document.body;
const bigPictureElement = document.querySelector('.big-picture');
const picturesBlock = document.querySelector('.pictures');
const bigPictureCloseElement = bigPictureElement.querySelector(
  '.big-picture__cancel'
);

function openBigPicture(url, likesCount, commentsCount, description) {
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
    }
  });
}

function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      bigPictureElement.classList.add('hidden');
    }
  });
}

picturesBlock.addEventListener('click', (evt) => {
  const a = evt.target.closest('a');
  if (!a) {
    return;
  }
  const post = posts[a.dataset.index];
  const { url, likes, comments, description } = post;
  openBigPicture(url, likes, comments.length, description);

  const commentsUl = bigPictureElement.querySelector('.social__comments');
  const commentsLiCollection = post.comments.map(({ avatar, name, message }) =>
    createSocialComment(avatar, name, message)
  );
  commentsUl.append(...commentsLiCollection);

  const socialCommentCount = bigPictureElement.querySelector(
    '.social__comment-count'
  );
  const commentsLoader = bigPictureElement.querySelector('.comments-loader');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
});

bigPictureCloseElement.addEventListener('click', () => {
  closeBigPicture();
});

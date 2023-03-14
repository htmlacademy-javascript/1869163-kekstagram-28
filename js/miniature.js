import { posts } from './data.js';

const similarPosts = posts;

const similarMiniaturesList = document.querySelector('.pictures');
const miniaturesTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const miniatureListFragment = document.createDocumentFragment();

similarPosts.forEach(({ url, comments, likes }) => {
  const miniatureElement = miniaturesTemplate.cloneNode(true);
  miniatureElement.querySelector('.picture__img').src = url;
  miniatureElement.querySelector('.picture__comments').textContent =
    comments.length;
  miniatureElement.querySelector('.picture__likes').textContent = likes;
  miniatureListFragment.appendChild(miniatureElement);
});

similarMiniaturesList.appendChild(miniatureListFragment);

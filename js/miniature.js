import { posts } from './data.js';

const similarMiniaturesList = document.querySelector('.pictures');
const miniaturesTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const miniatureListFragment = document.createDocumentFragment();

const renderPosts = () => {
  posts.forEach(({ url, comments, likes }, index) => {
    const miniatureElement = miniaturesTemplate.cloneNode(true);
    miniatureElement.querySelector('.picture__img').src = url;
    miniatureElement.querySelector('.picture__comments').textContent =
      comments.length;
    miniatureElement.querySelector('.picture__likes').textContent = likes;
    miniatureElement.dataset.index = index;
    miniatureListFragment.appendChild(miniatureElement);
  });

  similarMiniaturesList.appendChild(miniatureListFragment);
};

export { similarMiniaturesList, renderPosts };

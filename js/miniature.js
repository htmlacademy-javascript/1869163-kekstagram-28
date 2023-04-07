import { getPosts } from './data.js';

const similarMiniaturesList = document.querySelector('.pictures');
const miniaturesTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const miniatureListFragment = document.createDocumentFragment();

const getMiniatureElement = ({ url, comments, likes, index }) => {
  const miniatureElement = miniaturesTemplate.cloneNode(true);
  miniatureElement.querySelector('.picture__img').src = url;
  miniatureElement.querySelector('.picture__comments').textContent =
    comments.length;
  miniatureElement.querySelector('.picture__likes').textContent = likes;
  miniatureElement.dataset.index = index;

  return miniatureElement;
};

const renderPosts = () => {
  const allCurrentPosts = document.querySelectorAll('.picture');
  allCurrentPosts.forEach((post) => post.remove());

  getPosts().forEach(({ url, comments, likes }, index) =>
    miniatureListFragment.appendChild(
      getMiniatureElement({
        url,
        comments,
        likes,
        index,
      })
    )
  );

  similarMiniaturesList.appendChild(miniatureListFragment);
};

export { similarMiniaturesList, renderPosts };

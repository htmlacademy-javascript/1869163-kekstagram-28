import { getPosts, setPostsToDefault, sortPosts, updatePosts } from './data.js';
import { extractSubArray, shuffle, debounce } from './util.js';

const RANDOM_POSTS_AMOUNT = 10;
const DEBOUNCE_TIME_DELAY = 500;

const postsFilterSection = document.querySelector('.img-filters');
const filterButtonsForm = postsFilterSection.querySelector('form');

let activeFilterButton = filterButtonsForm.querySelector('#filter-default');

const showPostsFilter = () => {
  postsFilterSection.classList.remove('img-filters--inactive');
};

const getRandomPosts = () =>
  getPosts().length > 0
    ? extractSubArray(shuffle(getPosts()), RANDOM_POSTS_AMOUNT)
    : [];

const onFilterButtonsFormClickNoDebounce = (evt) => {
  activeFilterButton.classList.remove('img-filters__button--active');
  activeFilterButton = evt.target;
  activeFilterButton.classList.add('img-filters__button--active');
};

const onFilterButtonsFormClick = () => {
  const isRandomButtonActive = activeFilterButton.id === 'filter-random';
  const isDiscussedButtonActive = activeFilterButton.id === 'filter-discussed';

  if (isRandomButtonActive) {
    updatePosts(getRandomPosts());
    return;
  }

  if (isDiscussedButtonActive) {
    setPostsToDefault();
    sortPosts();
    return;
  }

  setPostsToDefault();
};

filterButtonsForm.addEventListener('click', onFilterButtonsFormClickNoDebounce);
filterButtonsForm.addEventListener(
  'click',
  debounce(onFilterButtonsFormClick, DEBOUNCE_TIME_DELAY)
);

export { showPostsFilter, getRandomPosts };

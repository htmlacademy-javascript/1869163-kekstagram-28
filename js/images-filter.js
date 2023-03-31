import { posts, setPostsToDefault, sortPosts, updatePosts } from './data.js';
import { extractSubArray, shuffle, debounce } from './util.js';

const RANDOM_POSTS_AMOUNT = 10;
const DEBOUNCE_TIME_DELAY = 500;

const postsFilterSection = document.querySelector('.img-filters');

const postsFilterButtonDefault =
  postsFilterSection.querySelector('#filter-default');
const postsFilterButtonRandom =
  postsFilterSection.querySelector('#filter-random');
const postsFilterButtonDiscussed =
  postsFilterSection.querySelector('#filter-discussed');

const postsFilterButtons = [
  postsFilterButtonDefault,
  postsFilterButtonRandom,
  postsFilterButtonDiscussed,
];

const showPostsFilter = () => {
  postsFilterSection.classList.remove('img-filters--inactive');
};

const getRandomPosts = () =>
  posts.length > 0 ? extractSubArray(shuffle(posts), RANDOM_POSTS_AMOUNT) : [];

const onPostsFilterButtonClick = (choosenFilterButton) => {
  postsFilterButtons.forEach((everyFilterButton) =>
    everyFilterButton.classList.remove('img-filters__button--active')
  );
  choosenFilterButton.classList.add('img-filters__button--active');
};

postsFilterButtons.forEach((button) =>
  button.addEventListener('click', () => onPostsFilterButtonClick(button))
);

const onDefaultButtonClick = () => setPostsToDefault();

postsFilterButtonDefault.addEventListener(
  'click',
  debounce(onDefaultButtonClick, DEBOUNCE_TIME_DELAY)
);

const onRandomButtonClick = () => updatePosts(getRandomPosts());

postsFilterButtonRandom.addEventListener(
  'click',
  debounce(onRandomButtonClick, DEBOUNCE_TIME_DELAY)
);

const onDiscussedButtonClick = () => {
  setPostsToDefault();
  sortPosts();
};

postsFilterButtonDiscussed.addEventListener(
  'click',
  debounce(onDiscussedButtonClick, DEBOUNCE_TIME_DELAY)
);

export { showPostsFilter, getRandomPosts };

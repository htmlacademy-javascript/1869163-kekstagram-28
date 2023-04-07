import { renderPosts } from './miniature.js';

let initPosts = [];
let posts = [];

const getPosts = () => posts;

const updatePosts = (newPosts) => {
  posts = newPosts;
  renderPosts();
};

const updateInitPosts = (newPosts) => {
  initPosts = newPosts;
};

const sortPosts = () => {
  const sortedPosts =
    posts.length > 0
      ? [...posts].sort((a, b) => b.comments.length - a.comments.length)
      : [];
  updatePosts(sortedPosts);
};

const setPostsToDefault = () => updatePosts(initPosts);

export { getPosts, updatePosts, updateInitPosts, setPostsToDefault, sortPosts };

import { renderPosts } from './miniature.js';

let posts = [];

const updatePosts = (newPosts) => {
  posts = newPosts;
  renderPosts();
};

export { posts, updatePosts };

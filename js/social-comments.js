const createSocialComment = (avatarUrl, name, text) => {
  const div = document.createElement('div');
  div.innerHTML = `<li class="social__comment">
    <img
        class="social__picture"
        src="${avatarUrl}"
        alt="${name}"
        width="35" height="35">
    <p class="social__text">${text}</p>
</li>`;
  return div.children[0];
};

export { createSocialComment };

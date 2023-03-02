const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const commentsAmount = 5;

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const DESCRIPTION = [
  'Классная фоточка',
  'Офигенная фоточка',
  'Лучшая фоточка',
  'Такую фоточку вы еще не видели',
];

const COMMENT_TEXT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const getShuffledIds = (start, end) =>
  new Array(end - start + 1)
    .fill(0)
    .map((num, index) => index + start)
    .sort(() => Math.random() - 0.5);

const getAvatarUrl = () => `img/avatar-${getRandomInteger(1, 6)}.svg`;
const getPostUrl = () => `photos/${getRandomInteger(1, 25)}.jpg`;
const getNumberOfLikes = () => getRandomInteger(15, 200);

const createComment = (id) => ({
  id,
  avatar: getAvatarUrl(),
  message: getRandomArrayElement(COMMENT_TEXT),
  name: getRandomArrayElement(NAMES),
});

const createNewCommentSection = (firstCommentId) => {
  const commentsIds = getShuffledIds(
    firstCommentId,
    firstCommentId + commentsAmount - 1
  );
  return commentsIds.map((id) => createComment(id));
};

const createPost = (id, index) => ({
  id,
  url: getPostUrl(),
  description: getRandomArrayElement(DESCRIPTION),
  likes: getNumberOfLikes(),
  comments: createNewCommentSection(index * commentsAmount),
});

const postIds = getShuffledIds(1, 25);

const posts = postIds.map((id, index) => createPost(id, index));

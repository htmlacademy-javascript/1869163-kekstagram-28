import { getRandomInteger } from './util.js';
import { getRandomArrayElement } from './util.js';

const COMMENTS_AMOUNT = 5;
const POSTS_AMOUNT = 25;
const AVATARS_AMOUNT = 6;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const DESCRIPTIONS = [
  'Классная фоточка',
  'Офигенная фоточка',
  'Лучшая фоточка',
  'Такую фоточку вы еще не видели',
];
const COMMENT_TEXTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
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

const getShuffledIds = (start, end) =>
  new Array(end - start + 1)
    .fill(0)
    .map((num, index) => index + start)
    .sort(() => Math.random() - 0.5);

const getAvatarUrl = () =>
  `img/avatar-${getRandomInteger(1, AVATARS_AMOUNT)}.svg`;
const getPostUrl = () => `photos/${getRandomInteger(1, POSTS_AMOUNT)}.jpg`;
const getNumberOfLikes = () => getRandomInteger(LIKES_MIN, LIKES_MAX);

const createComment = (id) => ({
  id,
  avatar: getAvatarUrl(),
  message: getRandomArrayElement(COMMENT_TEXTS),
  name: getRandomArrayElement(NAMES),
});

const createNewCommentSection = (firstCommentId) => {
  const commentsIds = getShuffledIds(
    firstCommentId,
    firstCommentId + COMMENTS_AMOUNT - 1
  );
  return commentsIds.map((id) => createComment(id));
};

const createPost = (id, index) => ({
  id,
  url: getPostUrl(),
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getNumberOfLikes(),
  comments: createNewCommentSection(index * COMMENTS_AMOUNT),
});

const postIds = getShuffledIds(1, POSTS_AMOUNT);

const createPosts = postIds.map((id, index) => createPost(id, index));

export { createPosts };

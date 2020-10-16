'use strict';

const MAX_LIKES_COUNT = 200;
const MIN_LIKES_COUNT = 15;
const BASE_PHOTOS_FOLDER = `photos`;
const BASE_PHOTOS_TYPE = `.jpg`;
const BASE_AVATAR_FOLDER = `img`;
const BASE_AVATAR_TYPE = `.svg`;
const MESSAGES = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?`
];
const NAMES = [
  `Таня`,
  `Ильдар`,
  `Кристина`,
  `Михаил`,
  `Бося`,
  `Костя`,
  `Терентий`,
  `Тамара`,
  `Руслан`
];

const pictureContainer = document.querySelector(`#picture`);

const renderPicture = function (picture) {
  const pictureElement = pictureContainer.cloneNode(true);
  pictureElement.content.querySelector(`.picture .picture__img`).setAttribute(`src`, picture.url);
  pictureElement.content.querySelector(`.picture__info .picture__likes`).textContent = picture.likes;
  pictureElement.content.querySelector(`.picture__info .picture__comments`).textContent = picture.comments.length;

  return pictureElement;
};

const randomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

const getPictureArray = function () {
  const pictureArray = [];

  for (let i = 1; i <= 25; i++) {
    pictureArray.push({
      url: BASE_PHOTOS_FOLDER + `/` + i.toString() + BASE_PHOTOS_TYPE,
      description: `lorem ipsum dolor`,
      likes: randomNumber(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
      comments: getPictureCommentsArray()
    });
  }
  return pictureArray;
};

const getPictureCommentsArray = function () {
  const commentsArray = [];
  const commentsCount = randomNumber(1, 6);

  for (let i = 0; i < commentsCount; i++) {
    commentsArray.push({
      avatar: `${BASE_AVATAR_FOLDER}/avatar-${randomNumber(1, 6)}${BASE_AVATAR_TYPE}`,
      message: MESSAGES[randomNumber(0, MESSAGES.length - 1)],
      name: NAMES[randomNumber(0, NAMES.length - 1)]
    });
  }
  return commentsArray;
};

const drawPictures = function () {
  const fragment = document.createDocumentFragment();
  const pictures = getPictureArray();
  for (let i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPicture(pictures[i]));
  }
  pictureContainer.appendChild(fragment);
};

drawPictures();

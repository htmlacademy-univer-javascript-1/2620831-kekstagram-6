import {NAMES, DESCRIPTIONS, MESSAGES} from './consts.js';
import {getRandomInteger, getRandomArrayElement} from './utils.js';


const createComment = function(){
  return {
    id: getRandomInteger(1, 1000),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES)
  };
};

const createPhoto = function(index) {
  return {
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: DESCRIPTIONS[index],
    likes: getRandomInteger(15,200),
    comments: Array.from({length: getRandomInteger(0,30)}, createComment)
  };
};

export const generatePhotos = () => Array.from({ length: 25 }, (_, index) => createPhoto(index));

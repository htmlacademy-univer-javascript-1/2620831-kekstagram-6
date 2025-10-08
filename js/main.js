const NAMES = [
  'Вася пупкин',
  'Иван Иванов',
  'Волкова Анастасия'
];

const DESCRIPTIONS = [
  'Отличный день на пляже!',
  'Горный поход был прекрасен',
  'Мой новый питомец',
  'Вкусный ужин в ресторане',
  'Закат над океаном',
  'Уютный вечер с книгой',
  'Путешествие в новый город',
  'Встреча с друзьями',
  'Мои цветы в саду',
  'Зимняя сказка',
  'Архитектура старого города',
  'Кофе и работа',
  'Спортивные достижения',
  'Романтический вечер',
  'Фестиваль музыки',
  'Прогулка в лесу',
  'Моё хобби',
  'Семейный праздник',
  'Новое хобби - фотография',
  'Уикенд на природе',
  'Городские огни ночью',
  'Вкус домашней выпечки',
  'Утро начинается с кофе',
  'Осенние краски',
  'Моменты счастья'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

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

const generatePhotos = () => Array.from({ length: 25 }, (_, index) => createPhoto(index));

const photos = generatePhotos();

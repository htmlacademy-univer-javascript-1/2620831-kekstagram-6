import { generatePhotos } from './data-generator.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const pictures = generatePhotos();

const pictureListElement = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();

pictures.forEach(({url, description, likes, comments}) => {
  const element = template.cloneNode(true);

  const imgElement = element.querySelector('.picture__img');
  imgElement.src = url;
  imgElement.alt = description;

  const likesElement = element.querySelector('.picture__likes');
  likesElement.textContent = likes;

  const commentsElement = element.querySelector('.picture__comments');
  commentsElement.textContent = comments.length;

  pictureListFragment.appendChild(element);
});

pictureListElement.appendChild(pictureListFragment);



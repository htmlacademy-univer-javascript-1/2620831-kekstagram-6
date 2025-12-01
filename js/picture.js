import { generatePhotos } from './data-generator.js';
import { openBigPicture } from './big-picture.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const pictures = generatePhotos();

const pictureListElement = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();

pictures.forEach((picture) => {
  const {url, description, likes, comments} = picture;
  const element = template.cloneNode(true);

  const imgElement = element.querySelector('.picture__img');
  imgElement.src = url;
  imgElement.alt = description;

  const likesElement = element.querySelector('.picture__likes');
  likesElement.textContent = likes;

  const commentsElement = element.querySelector('.picture__comments');
  commentsElement.textContent = comments.length;

  element.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(picture);
  });

  pictureListFragment.appendChild(element);
});

pictureListElement.appendChild(pictureListFragment);



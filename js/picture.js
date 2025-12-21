import { getData } from './api.js';
import { showErrorMessage } from './message.js';
import { openBigPicture } from './big-picture.js';
import { initFilters } from './filters.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures');
let pictures = [];

export const getPictures = () => pictures;

export const renderPictures = (data) => {
  pictures = data;

  const existingPictures = pictureList.querySelectorAll('.picture:not(.img-upload)');
  existingPictures.forEach((picture) => picture.remove());

  const pictureListFragment = document.createDocumentFragment();

  pictures.forEach(({url, description, likes, comments}, index) => {
    const element = template.cloneNode(true);
    element.querySelector('.picture__img').src = url;
    element.querySelector('.picture__img').alt = description;
    element.querySelector('.picture__likes').textContent = likes;
    element.querySelector('.picture__comments').textContent = comments.length;
    element.dataset.index = index;

    element.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(pictures[index], index);
    });

    pictureListFragment.appendChild(element);
  });

  pictureList.appendChild(pictureListFragment);
};

const onGetDataError = () => {
  showErrorMessage();
};

const initPictureModule = () => {
  getData()
    .then((data) => {
      renderPictures(data);
      initFilters(data);
    })
    .catch(onGetDataError);
};

export { initPictureModule };

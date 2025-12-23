import { getData } from './api.js';
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
  const errorDiv = document.createElement('div');
  errorDiv.className = 'data-error';
  errorDiv.textContent = 'Ошибка загрузки данных';
  errorDiv.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; background: red; color: white; padding: 10px; text-align: center; z-index: 1000;';
  document.body.appendChild(errorDiv);
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

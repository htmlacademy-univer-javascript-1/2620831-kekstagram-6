import { renderPictures } from './picture.js';
import { debounce } from './utils.js';

const RANDOM_PICTURES_COUNT = 10;
const DEBOUNCE_DELAY = 500;

const imgFilters = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const filterButtons = document.querySelectorAll('.img-filters__button');

let pictures = [];
let currentFilter = 'filter-default';

const showFilters = () => {
  imgFilters.classList.remove('img-filters--inactive');
};

const sortByComments = (a, b) => b.comments.length - a.comments.length;

const getRandomPictures = () => {
  const shuffled = [...pictures].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, RANDOM_PICTURES_COUNT);
};

const getFilteredPictures = () => {
  switch (currentFilter) {
    case 'filter-default':
      return [...pictures];
    case 'filter-random':
      return getRandomPictures();
    case 'filter-discussed':
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

const updateActiveButton = (selectedButton) => {
  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  selectedButton.classList.add('img-filters__button--active');
};

const applyFilter = (selectedFilter, button) => {
  currentFilter = selectedFilter;
  updateActiveButton(button);

  const filteredPictures = getFilteredPictures();
  renderPictures(filteredPictures);
};

const debouncedApplyFilter = debounce(applyFilter, DEBOUNCE_DELAY);

const onFilterClick = (evt) => {
  const button = evt.target.closest('.img-filters__button');

  if (!button || button.id === currentFilter) {
    return;
  }

  const selectedFilter = button.id;
  debouncedApplyFilter(selectedFilter, button);
};

const initFilters = (loadedPictures) => {
  pictures = loadedPictures;
  showFilters();

  filterForm.addEventListener('click', onFilterClick);
};

const resetFilters = () => {
  const defaultButton = document.querySelector('#filter-default');
  if (defaultButton) {
    applyFilter('filter-default', defaultButton);
  }
};

export { initFilters, resetFilters };

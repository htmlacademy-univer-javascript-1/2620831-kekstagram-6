import { isEscapeKey } from './utils.js';
import { getPictures } from './picture.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentCounter = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let currentPictureIndex = 0;

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKey);
  closeButton.removeEventListener('click', closeBigPicture);
};

function onEscKey(evt) {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
}

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  commentElement.innerHTML = `
    <img
      class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35" height="35">
    <p class="social__text">${comment.message}</p>
  `;

  return commentElement;
};

let visibleCommentsCount = 0;
const COMMENTS_PER_PAGE = 5;

const renderComments = (comments) => {
  const totalComments = comments.length;
  const commentsToShow = comments.slice(visibleCommentsCount, visibleCommentsCount + COMMENTS_PER_PAGE);

  commentsToShow.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    socialComments.appendChild(commentElement);
  });

  visibleCommentsCount += commentsToShow.length;

  commentCounter.textContent = `${visibleCommentsCount} из ${totalComments} комментариев`;

  const shownCount = bigPicture.querySelector('.social__comment-shown-count');
  const totalCount = bigPicture.querySelector('.social__comment-total-count');

  if (shownCount) {
    shownCount.textContent = visibleCommentsCount;
  }

  if (totalCount) {
    totalCount.textContent = totalComments;
  }

  if (visibleCommentsCount >= totalComments) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const onCommentsLoaderClick = () => {
  const pictures = getPictures();
  const pictureData = pictures[currentPictureIndex];
  renderComments(pictureData.comments);
};

const openBigPicture = (pictureData, index) => {
  currentPictureIndex = index;
  visibleCommentsCount = 0;

  socialComments.innerHTML = '';

  bigPictureImg.src = pictureData.url;
  bigPictureImg.alt = pictureData.description;
  likesCount.textContent = pictureData.likes;
  commentsCount.textContent = pictureData.comments.length;
  socialCaption.textContent = pictureData.description;

  let commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
  if (!commentTotalCount) {
    commentTotalCount = document.createElement('span');
    commentTotalCount.className = 'social__comment-total-count';
    bigPicture.appendChild(commentTotalCount);
  }
  commentTotalCount.textContent = pictureData.comments.length;

  let commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
  if (!commentShownCount) {
    commentShownCount = document.createElement('span');
    commentShownCount.className = 'social__comment-shown-count';
    bigPicture.appendChild(commentShownCount);
  }
  commentShownCount.textContent = '0';

  renderComments(pictureData.comments);

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKey);
  closeButton.addEventListener('click', closeBigPicture);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

const initBigPicture = () => {
};

export { openBigPicture, initBigPicture };

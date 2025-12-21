import { initPictureModule } from './picture.js';
import { initBigPicture } from './big-picture.js';
import { initFormUpload } from './form-upload.js';

const initApp = () => {
  initPictureModule();
  initBigPicture();
  initFormUpload();
};

document.addEventListener('DOMContentLoaded', initApp);

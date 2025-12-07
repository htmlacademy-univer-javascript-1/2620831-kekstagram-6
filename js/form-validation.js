
const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_SYMBOLS = 20;
const MAX_COMMENT_LENGTH = 140;

const HASHTAG_REGEX = new RegExp(`^#[a-zа-яё0-9]{1,${MAX_HASHTAG_SYMBOLS - 1}}$`, 'i');

const ErrorText = {
  INVALID_PATTERN: `Хэштег должен начинаться с # и содержать не более ${MAX_HASHTAG_SYMBOLS} символов`,
  INVALID_COUNT: `Не более ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги не должны повторяться',
  INVALID_COMMENT: `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов`
};

const ValidatorPriority = {
  PATTERN: 1,
  COUNT: 2,
  UNIQUENESS: 3,
  COMMENT: 1
};

const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const normalizeHashtags = (tagString) => tagString
  .trim()
  .split(/\s+/)
  .filter((tag) => tag.length > 0);

const hasValidHashtags = (value) => {
  const tags = normalizeHashtags(value);
  if (tags.length === 0) {
    return true;
  }
  return tags.every((tag) => HASHTAG_REGEX.test(tag));
};

const hasValidCount = (value) => {
  const tags = normalizeHashtags(value);
  return tags.length <= MAX_HASHTAG_COUNT;
};

const hasUniqueHashtags = (value) => {
  const tags = normalizeHashtags(value);
  if (tags.length <= 1) {
    return true;
  }
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const hasValidComment = (value) => value.length <= MAX_COMMENT_LENGTH;

const onFormSubmit = (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
};

const onHashtagInput = () => {
  pristine.validate(hashtagInput);
};

const onCommentInput = () => {
  pristine.validate(commentInput);
};

const initFormValidation = () => {
  pristine.addValidator(
    hashtagInput,
    hasValidHashtags,
    ErrorText.INVALID_PATTERN,
    ValidatorPriority.PATTERN,
    true
  );

  pristine.addValidator(
    hashtagInput,
    hasValidCount,
    ErrorText.INVALID_COUNT,
    ValidatorPriority.COUNT,
    true
  );

  pristine.addValidator(
    hashtagInput,
    hasUniqueHashtags,
    ErrorText.NOT_UNIQUE,
    ValidatorPriority.UNIQUENESS,
    true
  );

  pristine.addValidator(
    commentInput,
    hasValidComment,
    ErrorText.INVALID_COMMENT,
    ValidatorPriority.COMMENT,
    true
  );

  form.addEventListener('submit', onFormSubmit);
  hashtagInput.addEventListener('input', onHashtagInput);
  commentInput.addEventListener('input', onCommentInput);
};

const resetFormValidation = () => {
  pristine.reset();
  form.removeEventListener('submit', onFormSubmit);
  hashtagInput.removeEventListener('input', onHashtagInput);
  commentInput.removeEventListener('input', onCommentInput);
};

const validateForm = () => pristine.validate();

export {
  initFormValidation,
  resetFormValidation,
  validateForm,
  ErrorText
};

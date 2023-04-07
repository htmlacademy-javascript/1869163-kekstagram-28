const ALERT_SHOW_TIME = 5000;
const DEFAULT_SCALE_VALUE = 100;

const shuffle = (array) =>
  array.length > 0 ? [...array].sort(() => Math.random() - 0.5) : [];

const extractSubArray = (array, arrayLength) =>
  array.length > 0 ? [...array].slice(0, arrayLength) : [];

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  isEscapeKey,
  showAlert,
  shuffle,
  extractSubArray,
  debounce,
  DEFAULT_SCALE_VALUE,
};

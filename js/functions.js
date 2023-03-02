const isLong = (str, maxLength) => str.length <= maxLength;

const isPalindrome = (str) => {
  const noSpace = str.replace(/\s/g, '');
  const lower = noSpace.toLowerCase();
  const reverseStr = lower.split('').reverse('').join('');
  return lower === reverseStr;
};

const findNumber = (str) => {
  if (!isNaN(str)) {
    const positiveNumber = Math.abs(str);
    return positiveNumber;
  }

  const onlyNumbers = str.replace(/\D/g, '');

  if (onlyNumbers === '') {
    const noDigit = NaN;
    return noDigit;
  }
  return onlyNumbers;
};

const createPad = (str, minLength, pad) => {
  while (str.length < minLength) {
    const newStringLength = str.length + pad.length;
    const actualPad =
      newStringLength <= minLength
        ? pad
        : pad.slice(0, minLength - newStringLength);
    str = actualPad + str;
  }
  return str;
};

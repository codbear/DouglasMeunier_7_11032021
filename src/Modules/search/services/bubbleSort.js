const bubbleSort = (array, getValue = (x) => x) => {
  let isSwapped;

  do {
    isSwapped = false;

    // eslint-disable-next-line no-loop-func
    array.forEach((item, index) => {
      const nextItem = array[index + 1];

      if (!nextItem) {
        return;
      }

      if (getValue(item) < getValue(nextItem)) {
        // eslint-disable-next-line no-param-reassign
        [array[index], array[index + 1]] = [array[index + 1], array[index]];

        isSwapped = true;
      }
    });
  } while (isSwapped);

  return array;
};

export default bubbleSort;

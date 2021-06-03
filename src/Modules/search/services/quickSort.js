const quickSort = (array, getValue = (x) => x) => {
  if (array.length < 1) {
    return [];
  }

  const pivot = array.pop();

  const smallerValuesArray = array.filter((item) => getValue(item) < getValue(pivot));

  const higherValuesArray = array.filter((item) => getValue(item) >= getValue(pivot));

  return quickSort(higherValuesArray, getValue)
    .concat(
      [pivot],
      quickSort(smallerValuesArray, getValue),
    );
};

export default quickSort;

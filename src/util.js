function mergeSort(array) {
  if (array.length === 1) return array;

  const half = Math.ceil(array.length / 2);

  let leftArray = array.slice(0, half);
  let rightArray = array.slice(half);
  return merge(mergeSort(leftArray), mergeSort(rightArray));
}

function merge(leftArray, rightArray) {
  if (leftArray.length === 0) {
    return rightArray;
  }
  if (rightArray.length === 0) {
    return leftArray;
  }
  let elementToReturn = null;
  if (leftArray[0] <= rightArray[0]) {
    elementToReturn = leftArray.shift();
  } else {
    elementToReturn = rightArray.shift();
  }
  return [elementToReturn, ...merge(leftArray, rightArray)];
}

function removeDuplicates(array) {
  const arrayWithoutDuplicates = [...new Set(array)];
  return arrayWithoutDuplicates;
}

function getDifference(a, b) {
  if (a > b) {
    return a - b;
  }

  return b - a;
}

export { mergeSort, removeDuplicates, getDifference };

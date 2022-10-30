const findMaxValue = (arr: number[]): number => {
  /**
   * Not doing binary search bc I can't be sure if the array is sorted.
   * But statistically speaking, going last to first element is usually better bc it can be not sorted/half sorted/sorted.
   */
  /**
   * Não usarei busca binária pq não tenho certeza se estará ordenada.
   * Estatisticamente falando ir do final ao começo é melhor porque pode estar não ordenada/meio ordenada/ordenada.
   */
  let maxIndex = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > arr[maxIndex]) {
      maxIndex = i;
    }
  }

  return maxIndex;
};

export default findMaxValue;

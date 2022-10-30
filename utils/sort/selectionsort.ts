export default function* selectionSort(arr: number[]) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
      yield { arr: arr, idx: minIndex, pivot: j };
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }

  return { arr: arr, idx: -1, pivot: -1 };
}

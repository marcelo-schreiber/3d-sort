export default function* insertionSort(arr: number[]) {
  const length = arr.length;

  for (let i = 1; i < length; i++) {
    const key = arr[i];
    let j = i - 1;

    yield { arr: arr, pivot: i, idx: j };

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
      yield { arr: arr, pivot: i, idx: j };
    }
    arr[j + 1] = key;
  }
  return { arr: arr, pivot: -1, idx: -1 };
}

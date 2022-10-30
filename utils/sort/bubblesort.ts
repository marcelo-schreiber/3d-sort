export default function* bubbleSort(arr: number[]): Generator<{
  idx: number;
  arr: number[];
  idx2?: number | undefined;
  pivot: number;
}> {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      yield { arr: arr, idx: j, idx2: j + 1, pivot: j + 1 };

      if (arr[j] > arr[j + 1]) {
        const tmp = arr[j];

        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;

        yield { arr: arr, idx: j, idx2: j + 1, pivot: j + 1 };
      }
    }
  }
  return { arr: arr, idx: -1, idx2: -1, pivot: -1 };
}

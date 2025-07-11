export default function* bubbleSort(arr: number[]): Generator<{
  idx: number;
  arr: number[];
  idx2?: number | undefined;
  pivot: number;
  swapped?: boolean | undefined;
}> {
  const arrSize = arr.length;

  for (let i = 0; i < arrSize; i++) {
    for (let j = 0; j < arrSize - i - 1; j++) {
      const current = arr[j];
      const next = arr[j + 1];
      
      yield { arr: arr, idx: j, idx2: j + 1, pivot: j + 1 };
      
      if (current > next) {
        yield { arr: arr, idx: j, idx2: j + 1, pivot: j + 1, swapped: true };
        arr[j] = next;
        arr[j + 1] = current;

        // yield { arr: arr, idx: j, idx2: j + 1, pivot: j + 1 };
      }
    }
  }

  return { arr: arr, idx: -1, idx2: -1, pivot: -1 };
}

export default function* mergeSort(
  arr: number[],
  i = 0,
  j = arr.length - 1
): any {
  const middle = Math.floor((j - i) / 2) + i;

  yield {
    arr: arr,
    idx: i,
    pivot: middle,
    idx2: j,
  };

  if (j <= i) return { arr: arr };

  yield* mergeSort(arr, i, middle);
  yield* mergeSort(arr, middle + 1, j);
  yield* merge(arr, i, middle, j);

  return { arr: arr };
}

export function* merge(
  arr: number[],
  i: number,
  middle: number,
  j: number
): any {
  let left = i;
  let right = middle + 1;
  const sorted: number[] = [];

  function* push(index: number) {
    yield {
      arr: arr,
      idx: index,
      idx2: middle,
    };
    sorted.push(arr[index]);
  }

  while (left <= middle && right <= j) {
    if (arr[left] <= arr[right]) {
      yield* push(left);
      left++;
    } else {
      yield* push(right);
      right++;
    }
  }
  while (left <= middle) {
    yield* push(left);
    left++;
  }
  while (right <= j) {
    yield* push(right);
    right++;
  }

  for (let k = 0; k < sorted.length; k++) {
    arr[i + k] = sorted[k];
  }
  return { arr: arr };
}

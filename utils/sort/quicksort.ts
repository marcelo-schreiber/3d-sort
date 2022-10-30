export default function* quickSort(arr: number[]): any {
  arr = arr.slice();
  yield* partition(arr, 0, arr.length);

  return { arr: arr };
}

function* partition(arr: number[], start: number, before: number): any {
  const length = before - start;

  if (length <= 1) return;

  /** Randomly select a pivot and move it to the head of the array  */
  const pivotIndex = start + Math.floor(Math.random() * length);
  [arr[start], arr[pivotIndex]] = [arr[pivotIndex], arr[start]];
  yield { arr: arr, pivot: pivotIndex };
  const pivot = arr[start];
  let pivotRank = start;

  for (let index = start + 1; index < before; index++) {
    yield { arr: arr, idx: index, pivot: pivotRank };
    if (arr[index] < pivot) {
      pivotRank++;
      [arr[index], arr[pivotRank]] = [arr[pivotRank], arr[index]];
    }
  }

  if (pivotRank !== start) {
    [arr[pivotRank], arr[start]] = [arr[start], arr[pivotRank]];
    yield { arr: arr, pivot: pivotRank };
  }

  yield* partition(arr, start, pivotRank);

  yield* partition(arr, pivotRank + 1, before);
}

export default function* quickSort(arr: number[]): any {
  arr = arr.slice();
  yield* partition(arr, 0, arr.length);

  return { arr: arr };
}

function* partition(arr: number[], start: number, before: number): any {
  const length = before - start;

  if (length <= 1) return;

  // Use fixed pivot at start, no random
  const pivotIndex = start;
  const pivot = arr[pivotIndex];
  let pivotRank = start;

  // Yield initial pivot selection (no swap needed)
  yield { arr: [...arr], pivot: pivotIndex, swapped: false };

  for (let index = start + 1; index < before; index++) {
    yield { arr: [...arr], idx: index, idx2: pivotRank, pivot: pivotRank, swapped: false };

    if (arr[index] < pivot) {
      pivotRank++;
      // Swap elements and yield swapped state
      [arr[index], arr[pivotRank]] = [arr[pivotRank], arr[index]];
      yield { arr: [...arr], idx: index, idx2: pivotRank, pivot: pivotRank, swapped: true };
    }
  }

  // Finally swap pivot into its correct place if needed
  if (pivotRank !== start) {
    [arr[pivotRank], arr[start]] = [arr[start], arr[pivotRank]];
    yield { arr: [...arr], idx: start, idx2: pivotRank, pivot: pivotRank, swapped: true };
  }

  // Recursive calls
  yield* partition(arr, start, pivotRank);
  yield* partition(arr, pivotRank + 1, before);
}

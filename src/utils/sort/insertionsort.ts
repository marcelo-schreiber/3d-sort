export default function* insertionSort(arr: number[]) {
  const length = arr.length;

  for (let i = 1; i < length; i++) {
    let j = i;
    // Yield initial pivot without swap
    yield { arr: [...arr], pivot: i+1, idx: -1, idx2: -1 };

    while (j > 0 && arr[j - 1] > arr[j]) {
      // Swap elements
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];

      // Yield swap info: idx2 = j, idx = j - 1, pivot stays i
      yield { arr: [...arr], pivot: i+1, idx2: j, idx: j - 1, swapped: true };

      j--;
    }
  }

  // Final state, no pivot or swaps
  return { arr: [...arr], pivot: -1, idx: -1, idx2: -1 };
}

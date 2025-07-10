function maxHeapify(heap: number[], size: number, i: number) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < size && heap[left] > heap[largest]) {
    largest = left;
  }

  if (right < size && heap[right] > heap[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [heap[i], heap[largest]] = [heap[largest], heap[i]];
    maxHeapify(heap, size, largest);
  }
}

function makeMaxHeap(heap: number[], size: number) {
  for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
    maxHeapify(heap, size, i);
  }
}

export default function* heapSort(arr: number[]) {
  const size = arr.length;
  makeMaxHeap(arr, size);

  for (let i = size - 1; i > 0; i--) {
    yield { arr: [...arr], idx: 0, idx2: i, pivot: i, swapped: false };
    yield { arr: [...arr], idx: 0, idx2: i, pivot: i, swapped: true };

    [arr[0], arr[i]] = [arr[i], arr[0]];

    yield { arr: [...arr], idx: 0, idx2: i, pivot: i, swapped: false };

    maxHeapify(arr, i, 0);

  }

  return { arr: [...arr], idx: -1, idx2: -1, pivot: -1, swapped: false };
}

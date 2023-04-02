function maxHeapify(heap: number[], size: number) {
  for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
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
      maxHeapify(heap, size);
    }
  }
  return heap;
}

function makeMaxHeap(heap: number[], size: number) {
  for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
    maxHeapify(heap, size);
  }
  return heap;
}

export default function* heapSort(heap: number[]) {
  const size = heap.length;
  makeMaxHeap(heap, size);

  for (let i = size - 1; i > 0; i--) {
    yield { arr: heap, idx: i, pivot: 0 };
    [heap[0], heap[i]] = [heap[i], heap[0]]; // swap

    yield { arr: heap, idx: i, pivot: -1 };
    heap = makeMaxHeap(heap, i);
    yield { arr: heap, idx: i, pivot: -1 };
  }

  return { arr: heap, idx: -1, pivot: -1 }; // done
}

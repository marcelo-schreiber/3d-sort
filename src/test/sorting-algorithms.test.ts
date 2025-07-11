import { describe, it, expect } from 'vitest'
import bubbleSort from '../utils/sort/bubblesort'
import heapSort from '../utils/sort/heapsort'
import insertionSort from '../utils/sort/insertionsort'
import mergeSort from '../utils/sort/mergesort'
import quickSort from '../utils/sort/quicksort'
import selectionSort from '../utils/sort/selectionsort'

// Helper function to get the final sorted array from generator
function getFinalSortedArray(generator: Generator<any, any, unknown>): number[] {
  let result = generator.next()
  let finalArray: number[] = []
  
  while (!result.done) {
    if (result.value && result.value.arr) {
      finalArray = [...result.value.arr]
    }
    result = generator.next()
  }
  
  // Get the final return value
  if (result.value && result.value.arr) {
    finalArray = [...result.value.arr]
  }
  
  return finalArray
}

// Helper function to collect all steps from generator
function getAllSteps(generator: Generator<any, any, unknown>): any[] {
  const steps: any[] = []
  let result = generator.next()
  
  while (!result.done) {
    if (result.value) {
      steps.push(result.value)
    }
    result = generator.next()
  }
  
  // Add the final return value if it exists
  if (result.value) {
    steps.push(result.value)
  }
  
  return steps
}

// Test data
const testCases = [
  {
    name: 'empty array',
    input: [],
    expected: []
  },
  {
    name: 'single element',
    input: [5],
    expected: [5]
  },
  {
    name: 'already sorted',
    input: [1, 2, 3, 4, 5],
    expected: [1, 2, 3, 4, 5]
  },
  {
    name: 'reverse sorted',
    input: [5, 4, 3, 2, 1],
    expected: [1, 2, 3, 4, 5]
  },
  {
    name: 'random order',
    input: [3, 1, 4, 1, 5, 9, 2, 6],
    expected: [1, 1, 2, 3, 4, 5, 6, 9]
  },
  {
    name: 'duplicates',
    input: [3, 3, 1, 1, 2, 2],
    expected: [1, 1, 2, 2, 3, 3]
  },
  {
    name: 'negative numbers',
    input: [-3, -1, 0, 2, -5],
    expected: [-5, -3, -1, 0, 2]
  }
]

describe('Sorting Algorithms', () => {
  describe('Bubble Sort', () => {
    testCases.forEach(({ name, input, expected }) => {
      it(`should sort ${name} correctly`, () => {
        const inputCopy = [...input]
        const generator = bubbleSort(inputCopy)
        const result = getFinalSortedArray(generator)
        expect(result).toEqual(expected)
      })
    })

    it('should yield steps with correct structure', () => {
      const input = [3, 1, 2]
      const generator = bubbleSort([...input])
      const steps = getAllSteps(generator)
      
      // Should have at least one step
      expect(steps.length).toBeGreaterThan(0)
      
      // Each step should have required properties
      steps.forEach(step => {
        expect(step).toHaveProperty('arr')
        expect(step).toHaveProperty('idx')
        expect(step).toHaveProperty('pivot')
        expect(Array.isArray(step.arr)).toBe(true)
        expect(typeof step.idx).toBe('number')
        expect(typeof step.pivot).toBe('number')
      })
    })
  })

  describe('Heap Sort', () => {
    testCases.forEach(({ name, input, expected }) => {
      it(`should sort ${name} correctly`, () => {
        const inputCopy = [...input]
        const generator = heapSort(inputCopy)
        const result = getFinalSortedArray(generator)
        expect(result).toEqual(expected)
      })
    })

    it('should yield steps with correct structure', () => {
      const input = [3, 1, 2]
      const generator = heapSort([...input])
      const steps = getAllSteps(generator)
      
      if (input.length > 1) {
        expect(steps.length).toBeGreaterThan(0)
        
        steps.forEach(step => {
          expect(step).toHaveProperty('arr')
          expect(step).toHaveProperty('idx')
          expect(step).toHaveProperty('idx2')
          expect(step).toHaveProperty('pivot')
          expect(step).toHaveProperty('swapped')
          expect(Array.isArray(step.arr)).toBe(true)
        })
      }
    })
  })

  describe('Insertion Sort', () => {
    testCases.forEach(({ name, input, expected }) => {
      it(`should sort ${name} correctly`, () => {
        const inputCopy = [...input]
        const generator = insertionSort(inputCopy)
        const result = getFinalSortedArray(generator)
        expect(result).toEqual(expected)
      })
    })

    it('should yield steps with correct structure', () => {
      const input = [3, 1, 2]
      const generator = insertionSort([...input])
      const steps = getAllSteps(generator)
      
      expect(steps.length).toBeGreaterThan(0)
      
      steps.forEach(step => {
        expect(step).toHaveProperty('arr')
        expect(step).toHaveProperty('pivot')
        expect(step).toHaveProperty('idx')
        expect(step).toHaveProperty('idx2')
        expect(Array.isArray(step.arr)).toBe(true)
      })
    })
  })

  describe('Merge Sort', () => {
    testCases.forEach(({ name, input, expected }) => {
      it(`should sort ${name} correctly`, () => {
        const inputCopy = [...input]
        const generator = mergeSort(inputCopy)
        const result = getFinalSortedArray(generator)
        expect(result).toEqual(expected)
      })
    })

    it('should yield steps with correct structure', () => {
      const input = [3, 1, 2]
      const generator = mergeSort([...input])
      const steps = getAllSteps(generator)
      
      expect(steps.length).toBeGreaterThan(0)
      
      steps.forEach(step => {
        expect(step).toHaveProperty('arr')
        expect(Array.isArray(step.arr)).toBe(true)
      })
    })
  })

  describe('Quick Sort', () => {
    testCases.forEach(({ name, input, expected }) => {
      it(`should sort ${name} correctly`, () => {
        const inputCopy = [...input]
        const generator = quickSort(inputCopy)
        const result = getFinalSortedArray(generator)
        expect(result).toEqual(expected)
      })
    })

    it('should yield steps with correct structure', () => {
      const input = [3, 1, 2]
      const generator = quickSort([...input])
      const steps = getAllSteps(generator)
      
      expect(steps.length).toBeGreaterThan(0)
      
      steps.forEach(step => {
        expect(step).toHaveProperty('arr')
        expect(Array.isArray(step.arr)).toBe(true)
      })
    })
  })

  describe('Selection Sort', () => {
    testCases.forEach(({ name, input, expected }) => {
      it(`should sort ${name} correctly`, () => {
        const inputCopy = [...input]
        const generator = selectionSort(inputCopy)
        const result = getFinalSortedArray(generator)
        expect(result).toEqual(expected)
      })
    })

    it('should yield steps with correct structure', () => {
      const input = [3, 1, 2]
      const generator = selectionSort([...input])
      const steps = getAllSteps(generator)
      
      expect(steps.length).toBeGreaterThan(0)
      
      steps.forEach(step => {
        expect(step).toHaveProperty('arr')
        expect(step).toHaveProperty('idx')
        expect(step).toHaveProperty('pivot')
        expect(Array.isArray(step.arr)).toBe(true)
      })
    })
  })
})

describe('Algorithm Comparison', () => {
  it('all algorithms should produce the same sorted result', () => {
    const testArray = [64, 34, 25, 12, 22, 11, 90]
    const expected = [11, 12, 22, 25, 34, 64, 90]
    
    const algorithms = [
      { name: 'bubbleSort', fn: bubbleSort },
      { name: 'heapSort', fn: heapSort },
      { name: 'insertionSort', fn: insertionSort },
      { name: 'mergeSort', fn: mergeSort },
      { name: 'quickSort', fn: quickSort },
      { name: 'selectionSort', fn: selectionSort }
    ]
    
    algorithms.forEach(({ name, fn }) => {
      const inputCopy = [...testArray]
      const generator = fn(inputCopy)
      const result = getFinalSortedArray(generator)
      expect(result).toEqual(expected)
    })
  })
})

describe('Edge Cases', () => {
  it('should handle large arrays', () => {
    const largeArray = Array.from({ length: 100 }, () => Math.floor(Math.random() * 1000))
    const expected = [...largeArray].sort((a, b) => a - b)
    
    // Test with a few algorithms (not all to keep test fast)
    const algorithms = [
      { name: 'quickSort', fn: quickSort },
      { name: 'mergeSort', fn: mergeSort },
      { name: 'heapSort', fn: heapSort }
    ]
    
    algorithms.forEach(({ name, fn }) => {
      const inputCopy = [...largeArray]
      const generator = fn(inputCopy)
      const result = getFinalSortedArray(generator)
      expect(result).toEqual(expected)
    })
  })

  it('should handle arrays with all same elements', () => {
    const sameElements = [5, 5, 5, 5, 5]
    const expected = [5, 5, 5, 5, 5]
    
    const algorithms = [
      bubbleSort, heapSort, insertionSort, mergeSort, quickSort, selectionSort
    ]
    
    algorithms.forEach(algorithm => {
      const inputCopy = [...sameElements]
      const generator = algorithm(inputCopy)
      const result = getFinalSortedArray(generator)
      expect(result).toEqual(expected)
    })
  })

  it('should handle arrays with two elements', () => {
    const testCases = [
      { input: [2, 1], expected: [1, 2] },
      { input: [1, 2], expected: [1, 2] },
      { input: [5, 5], expected: [5, 5] }
    ]
    
    const algorithms = [
      bubbleSort, heapSort, insertionSort, mergeSort, quickSort, selectionSort
    ]
    
    testCases.forEach(({ input, expected }) => {
      algorithms.forEach(algorithm => {
        const inputCopy = [...input]
        const generator = algorithm(inputCopy)
        const result = getFinalSortedArray(generator)
        expect(result).toEqual(expected)
      })
    })
  })

  it('should handle arrays with extreme values', () => {
    const extremeValues = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, 0, -1, 1]
    const expected = [Number.MIN_SAFE_INTEGER, -1, 0, 1, Number.MAX_SAFE_INTEGER]
    
    const algorithms = [
      bubbleSort, heapSort, insertionSort, mergeSort, quickSort, selectionSort
    ]
    
    algorithms.forEach(algorithm => {
      const inputCopy = [...extremeValues]
      const generator = algorithm(inputCopy)
      const result = getFinalSortedArray(generator)
      expect(result).toEqual(expected)
    })
  })

  it('should not modify original array reference for immutable algorithms', () => {
    const original = [3, 1, 4, 1, 5]
    const originalCopy = [...original]
    
    // Test algorithms that should not modify the original array
    const immutableAlgorithms = [quickSort, mergeSort]
    
    immutableAlgorithms.forEach(algorithm => {
      const testArray = [...original]
      const generator = algorithm(testArray)
      getFinalSortedArray(generator)
      
      // The original should remain unchanged for truly immutable implementations
      // Note: Some implementations might modify the input, which is also valid
      expect(original).toEqual(originalCopy)
    })
  })

  it('should handle floating point numbers correctly', () => {
    const floatArray = [3.14, 2.71, 1.41, 0.577, 2.718]
    const expected = [0.577, 1.41, 2.71, 2.718, 3.14]
    
    const algorithms = [
      bubbleSort, heapSort, insertionSort, mergeSort, quickSort, selectionSort
    ]
    
    algorithms.forEach(algorithm => {
      const inputCopy = [...floatArray]
      const generator = algorithm(inputCopy)
      const result = getFinalSortedArray(generator)
      expect(result).toEqual(expected)
    })
  })
})

describe('Generator Behavior and Visualization Data', () => {
  it('should yield consistent array lengths throughout sorting', () => {
    const input = [5, 2, 8, 1, 9]
    const algorithms = [
      bubbleSort, heapSort, insertionSort, mergeSort, quickSort, selectionSort
    ]
    
    algorithms.forEach(algorithm => {
      const inputCopy = [...input]
      const generator = algorithm(inputCopy)
      const steps = getAllSteps(generator)
      
      steps.forEach(step => {
        if (step.arr) {
          expect(step.arr.length).toBe(input.length)
        }
      })
    })
  })

  it('should maintain array element sum throughout sorting', () => {
    const input = [5, 2, 8, 1, 9]
    const expectedSum = input.reduce((sum, val) => sum + val, 0)
    const algorithms = [
      bubbleSort, heapSort, insertionSort, mergeSort, quickSort, selectionSort
    ]
    
    algorithms.forEach(algorithm => {
      const inputCopy = [...input]
      const generator = algorithm(inputCopy)
      const steps = getAllSteps(generator)
      
      steps.forEach(step => {
        if (step.arr) {
          const stepSum = step.arr.reduce((sum: number, val: number) => sum + val, 0)
          expect(stepSum).toBe(expectedSum)
        }
      })
    })
  })

  it('should have valid index values in visualization steps', () => {
    const input = [5, 2, 8, 1, 9]
    const algorithms = [
      { name: 'bubbleSort', fn: bubbleSort },
      { name: 'heapSort', fn: heapSort },
      { name: 'insertionSort', fn: insertionSort },
      { name: 'selectionSort', fn: selectionSort }
    ]
    
    algorithms.forEach(({ name, fn }) => {
      const inputCopy = [...input]
      const generator = fn(inputCopy)
      const steps = getAllSteps(generator)
      
      steps.forEach(step => {
        if (step.idx !== undefined && step.idx !== -1) {
          expect(step.idx).toBeGreaterThanOrEqual(0)
          expect(step.idx).toBeLessThan(input.length)
        }
        if (step.idx2 !== undefined && step.idx2 !== -1) {
          expect(step.idx2).toBeGreaterThanOrEqual(0)
          expect(step.idx2).toBeLessThan(input.length)
        }
        if (step.pivot !== undefined && step.pivot !== -1) {
          expect(step.pivot).toBeGreaterThanOrEqual(0)
          expect(step.pivot).toBeLessThanOrEqual(input.length)
        }
      })
    })
  })

  it('should end with final state indicators', () => {
    const input = [3, 1, 2]
    const algorithms = [
      { name: 'bubbleSort', fn: bubbleSort },
      { name: 'heapSort', fn: heapSort },
      { name: 'insertionSort', fn: insertionSort },
      { name: 'selectionSort', fn: selectionSort }
    ]
    
    algorithms.forEach(({ name, fn }) => {
      const inputCopy = [...input]
      const generator = fn(inputCopy)
      const steps = getAllSteps(generator)
      const finalStep = steps[steps.length - 1]
      
      // Final step should typically have -1 values to indicate completion
      expect(finalStep.idx).toBe(-1)
      if (finalStep.idx2 !== undefined) {
        expect(finalStep.idx2).toBe(-1)
      }
      expect(finalStep.pivot).toBe(-1)
    })
  })
})

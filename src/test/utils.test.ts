import { describe, it, expect, beforeEach, vi } from 'vitest'
import findMaxValue from '../utils/findMaxValue'
import shuffle from '../utils/shuffle'

describe('Utility Functions', () => {
  describe('findMaxValue', () => {
    it('should find the index of the maximum value in an array', () => {
      expect(findMaxValue([1, 3, 2, 5, 4])).toBe(3) // index of 5
      expect(findMaxValue([10, 2, 8, 4])).toBe(0) // index of 10
      expect(findMaxValue([1, 1, 1, 1])).toBe(0) // first occurrence
    })

    it('should handle single element array', () => {
      expect(findMaxValue([42])).toBe(0)
    })

    it('should handle negative numbers', () => {
      expect(findMaxValue([-5, -2, -10, -1])).toBe(3) // index of -1
    })

    it('should return the first occurrence of maximum value', () => {
      expect(findMaxValue([5, 5, 3, 5, 2])).toBe(0) // first 5
    })

    it('should handle array with zero', () => {
      expect(findMaxValue([0, -1, -2])).toBe(0) // index of 0
    })

    it('should handle mixed positive and negative numbers', () => {
      expect(findMaxValue([-3, 0, 5, -1, 2])).toBe(2) // index of 5
    })
  })

  describe('shuffle', () => {
    beforeEach(() => {
      // Reset Math.random mock before each test
      vi.restoreAllMocks()
    })

    it('should return an array with the same length', () => {
      const input = [1, 2, 3, 4, 5]
      const result = shuffle([...input])
      expect(result.length).toBe(input.length)
    })

    it('should contain all original elements', () => {
      const input = [1, 2, 3, 4, 5]
      const result = shuffle([...input])
      
      // Sort both arrays to compare elements
      const sortedInput = [...input].sort()
      const sortedResult = [...result].sort()
      
      expect(sortedResult).toEqual(sortedInput)
    })

    it('should handle empty array', () => {
      const result = shuffle([])
      expect(result).toEqual([])
    })

    it('should handle single element array', () => {
      const input = [42]
      const result = shuffle([...input])
      expect(result).toEqual([42])
    })

    it('should handle array with duplicates', () => {
      const input = [1, 1, 2, 2, 3]
      const result = shuffle([...input])
      
      expect(result.length).toBe(5)
      
      // Count occurrences of each element
      const countInput = input.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1
        return acc
      }, {} as Record<number, number>)
      
      const countResult = result.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1
        return acc
      }, {} as Record<number, number>)
      
      expect(countResult).toEqual(countInput)
    })

    it('should actually shuffle the array (not always return same order)', () => {
      // Mock Math.random to control the shuffle
      const mockMath = vi.spyOn(Math, 'random')
      
      // First call - no shuffle (random returns 0)
      mockMath.mockImplementation(() => 0)
      const input1 = [1, 2, 3, 4, 5]
      const result1 = shuffle([...input1])
      
      // Second call - some shuffle (random returns 0.5)
      mockMath.mockImplementation(() => 0.5)
      const input2 = [1, 2, 3, 4, 5]
      const result2 = shuffle([...input2])
      
      // At least one should be different from the original
      const isShuffled1 = !result1.every((val, index) => val === input1[index])
      const isShuffled2 = !result2.every((val, index) => val === input2[index])
      
      expect(isShuffled1 || isShuffled2).toBe(true)
    })

    it('should modify the input array in place', () => {
      const input = [1, 2, 3, 4, 5]
      const originalInput = [...input]
      const result = shuffle(input)
      
      // Result should be the same reference as input
      expect(result).toBe(input)
      
      // Input should contain same elements but potentially different order
      const sortedInput = [...input].sort()
      const sortedOriginal = [...originalInput].sort()
      expect(sortedInput).toEqual(sortedOriginal)
    })

    it('should work with negative numbers', () => {
      const input = [-3, -1, -5, -2, -4]
      const result = shuffle([...input])
      
      expect(result.length).toBe(5)
      expect([...result].sort()).toEqual([...input].sort())
    })

    it('should work with large arrays', () => {
      const input = Array.from({ length: 1000 }, (_, i) => i)
      const result = shuffle([...input])
      
      expect(result.length).toBe(1000)
      expect([...result].sort((a, b) => a - b)).toEqual(input)
    })
  })
})

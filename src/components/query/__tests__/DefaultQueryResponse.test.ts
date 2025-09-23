import { DefaultQueryResponse } from '../DefaultQueryResponse';

describe('DefaultQueryResponse', () => {
  describe('builder pattern', () => {
    it('should create query response using builder', () => {
      const response = DefaultQueryResponse.builder()
        .setQueryValidity(true)
        .setHasResult(true)
        .setStringResult('test result')
        .setIsArray(false)
        .setResultArray(['test'])
        .build();

      expect(response.isValid()).toBe(true);
      expect(response.hasResult()).toBe(true);
      expect(response.getStringResultValue()).toBe('test result');
      expect(response.isResultArray()).toBe(false);
      expect(response.getArrayResult()).toEqual(['test']);
      expect(response.getValidationError()).toBe('');
    });

    it('should create invalid query response with error', () => {
      const errorMessage = 'Query syntax error';
      const response = DefaultQueryResponse.builder()
        .setQueryValidity(false)
        .setValidationError(errorMessage)
        .build();

      expect(response.isValid()).toBe(false);
      expect(response.getValidationError()).toBe(errorMessage);
      expect(response.hasResult()).toBe(false);
      expect(response.getStringResultValue()).toBe('');
      expect(response.isResultArray()).toBe(false);
      expect(response.getArrayResult()).toEqual([]);
    });

    it('should use default values when not set', () => {
      const response = DefaultQueryResponse.builder().build();

      expect(response.isValid()).toBe(false);
      expect(response.hasResult()).toBe(false);
      expect(response.getStringResultValue()).toBe('');
      expect(response.isResultArray()).toBe(false);
      expect(response.getArrayResult()).toEqual([]);
      expect(response.getValidationError()).toBe('');
    });

    it('should allow partial building', () => {
      const response = DefaultQueryResponse.builder()
        .setQueryValidity(true)
        .setHasResult(true)
        .build();

      expect(response.isValid()).toBe(true);
      expect(response.hasResult()).toBe(true);
      expect(response.getStringResultValue()).toBe('');
      expect(response.isResultArray()).toBe(false);
      expect(response.getArrayResult()).toEqual([]);
    });
  });

  describe('builder chaining', () => {
    it('should support method chaining', () => {
      const response = DefaultQueryResponse.builder()
        .setQueryValidity(true)
        .setHasResult(true)
        .setStringResult('chained result')
        .setIsArray(true)
        .setResultArray(['item1', 'item2'])
        .build();

      expect(response.isValid()).toBe(true);
      expect(response.hasResult()).toBe(true);
      expect(response.getStringResultValue()).toBe('chained result');
      expect(response.isResultArray()).toBe(true);
      expect(response.getArrayResult()).toEqual(['item1', 'item2']);
    });

    it('should allow overwriting values', () => {
      const response = DefaultQueryResponse.builder()
        .setQueryValidity(false)
        .setQueryValidity(true) // Override
        .setStringResult('first result')
        .setStringResult('second result') // Override
        .build();

      expect(response.isValid()).toBe(true);
      expect(response.getStringResultValue()).toBe('second result');
    });
  });

  describe('array handling', () => {
    it('should handle array results correctly', () => {
      const arrayResult = [1, 2, 3, 'text', { key: 'value' }];
      const response = DefaultQueryResponse.builder()
        .setQueryValidity(true)
        .setHasResult(true)
        .setIsArray(true)
        .setResultArray(arrayResult)
        .setStringResult(JSON.stringify(arrayResult))
        .build();

      expect(response.isResultArray()).toBe(true);
      expect(response.getArrayResult()).toEqual(arrayResult);
      expect(response.getArrayResult()).toHaveLength(5);
    });

    it('should handle empty array results', () => {
      const response = DefaultQueryResponse.builder()
        .setQueryValidity(true)
        .setHasResult(false)
        .setIsArray(true)
        .setResultArray([])
        .build();

      expect(response.isResultArray()).toBe(true);
      expect(response.getArrayResult()).toEqual([]);
      expect(response.hasResult()).toBe(false);
    });

    it('should handle single value as non-array', () => {
      const response = DefaultQueryResponse.builder()
        .setQueryValidity(true)
        .setHasResult(true)
        .setIsArray(false)
        .setStringResult('single value')
        .setResultArray(['single value'])
        .build();

      expect(response.isResultArray()).toBe(false);
      expect(response.getStringResultValue()).toBe('single value');
      expect(response.getArrayResult()).toEqual(['single value']);
    });
  });

  describe('validation error handling', () => {
    it('should store validation errors', () => {
      const errors = [
        'Syntax error at position 5',
        'Unknown function: invalidFunc',
        'Missing closing bracket'
      ];

      errors.forEach(error => {
        const response = DefaultQueryResponse.builder()
          .setQueryValidity(false)
          .setValidationError(error)
          .build();

        expect(response.isValid()).toBe(false);
        expect(response.getValidationError()).toBe(error);
      });
    });

    it('should handle empty validation error', () => {
      const response = DefaultQueryResponse.builder()
        .setQueryValidity(false)
        .setValidationError('')
        .build();

      expect(response.isValid()).toBe(false);
      expect(response.getValidationError()).toBe('');
    });
  });

  describe('complex scenarios', () => {
    it('should handle successful query with multiple results', () => {
      const results = ['result1', 'result2', 'result3'];
      const stringResult = results.join('\n');
      
      const response = DefaultQueryResponse.builder()
        .setQueryValidity(true)
        .setHasResult(true)
        .setStringResult(stringResult)
        .setIsArray(true)
        .setResultArray(results)
        .build();

      expect(response.isValid()).toBe(true);
      expect(response.hasResult()).toBe(true);
      expect(response.isResultArray()).toBe(true);
      expect(response.getStringResultValue()).toBe(stringResult);
      expect(response.getArrayResult()).toEqual(results);
    });

    it('should handle query with no results', () => {
      const response = DefaultQueryResponse.builder()
        .setQueryValidity(true)
        .setHasResult(false)
        .setStringResult('')
        .setIsArray(false)
        .setResultArray([])
        .build();

      expect(response.isValid()).toBe(true);
      expect(response.hasResult()).toBe(false);
      expect(response.isResultArray()).toBe(false);
      expect(response.getStringResultValue()).toBe('');
      expect(response.getArrayResult()).toEqual([]);
    });
  });

  describe('immutability', () => {
    it('should be immutable after creation', () => {
      const originalArray = ['item1', 'item2'];
      const response = DefaultQueryResponse.builder()
        .setQueryValidity(true)
        .setResultArray(originalArray)
        .build();

      // Modifying original array should not affect response
      originalArray.push('item3');
      
      expect(response.getArrayResult()).toHaveLength(2);
      expect(response.getArrayResult()).toEqual(['item1', 'item2']);
    });

    it('should return consistent results on multiple calls', () => {
      const response = DefaultQueryResponse.builder()
        .setQueryValidity(true)
        .setHasResult(true)
        .setStringResult('consistent')
        .build();

      // Multiple calls should return same results
      expect(response.isValid()).toBe(true);
      expect(response.isValid()).toBe(true);
      expect(response.getStringResultValue()).toBe('consistent');
      expect(response.getStringResultValue()).toBe('consistent');
    });
  });
});
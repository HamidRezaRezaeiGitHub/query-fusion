import { DefaultValidationResponse } from '../DefaultValidationResponse';

describe('DefaultValidationResponse', () => {
  describe('constructor', () => {
    it('should create valid response with proper values', () => {
      const response = new DefaultValidationResponse(true, '');
      
      expect(response.isValid()).toBe(true);
      expect(response.getValidationError()).toBe('');
    });

    it('should create invalid response with error message', () => {
      const errorMessage = 'This is an error';
      const response = new DefaultValidationResponse(false, errorMessage);
      
      expect(response.isValid()).toBe(false);
      expect(response.getValidationError()).toBe(errorMessage);
    });

    it('should trim validation error message', () => {
      const response = new DefaultValidationResponse(false, '  whitespace error  ');
      
      expect(response.getValidationError()).toBe('whitespace error');
    });

    it('should handle empty error message', () => {
      const response = new DefaultValidationResponse(false, '');
      
      expect(response.isValid()).toBe(false);
      expect(response.getValidationError()).toBe('');
    });

    it('should handle null error message', () => {
      const response = new DefaultValidationResponse(false, null as any);
      
      expect(response.isValid()).toBe(false);
      expect(response.getValidationError()).toBe('');
    });

    it('should handle undefined error message', () => {
      const response = new DefaultValidationResponse(false, undefined as any);
      
      expect(response.isValid()).toBe(false);
      expect(response.getValidationError()).toBe('');
    });
  });

  describe('isValid method', () => {
    it('should return true for valid response', () => {
      const response = new DefaultValidationResponse(true, '');
      
      expect(response.isValid()).toBe(true);
    });

    it('should return false for invalid response', () => {
      const response = new DefaultValidationResponse(false, 'error');
      
      expect(response.isValid()).toBe(false);
    });
  });

  describe('getValidationError method', () => {
    it('should return empty string for valid response', () => {
      const response = new DefaultValidationResponse(true, '');
      
      expect(response.getValidationError()).toBe('');
    });

    it('should return error message for invalid response', () => {
      const errorMessage = 'Validation failed';
      const response = new DefaultValidationResponse(false, errorMessage);
      
      expect(response.getValidationError()).toBe(errorMessage);
    });

    it('should return trimmed error message', () => {
      const response = new DefaultValidationResponse(false, '   spaced error   ');
      
      expect(response.getValidationError()).toBe('spaced error');
    });
  });

  describe('immutability', () => {
    it('should maintain consistent state after creation', () => {
      const response = new DefaultValidationResponse(true, '');
      
      // Multiple calls should return same results
      expect(response.isValid()).toBe(true);
      expect(response.isValid()).toBe(true);
      expect(response.getValidationError()).toBe('');
      expect(response.getValidationError()).toBe('');
    });

    it('should not allow external modification of state', () => {
      const response = new DefaultValidationResponse(false, 'original error');
      
      // The response should be immutable
      expect(response.isValid()).toBe(false);
      expect(response.getValidationError()).toBe('original error');
    });
  });
});
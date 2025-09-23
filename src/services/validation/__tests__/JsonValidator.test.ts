import { JsonValidator } from '../JsonValidator';
import { IValidationResponse } from '../../../components/query/IValidationResponse';

describe('JsonValidator', () => {
  let validator: JsonValidator;

  beforeEach(() => {
    validator = new JsonValidator();
  });

  describe('isContentValid', () => {
    it('should return valid response for valid JSON string', () => {
      const validJson = '{"name": "John", "age": 30}';
      const result: IValidationResponse = validator.isContentValid(validJson);

      expect(result.isValid()).toBe(true);
      expect(result.getValidationError()).toBe('');
    });

    it('should return valid response for valid JSON array', () => {
      const validJsonArray = '[{"id": 1}, {"id": 2}]';
      const result: IValidationResponse = validator.isContentValid(validJsonArray);

      expect(result.isValid()).toBe(true);
      expect(result.getValidationError()).toBe('');
    });

    it('should return valid response for valid nested JSON', () => {
      const validNestedJson = '{"user": {"name": "Jane", "preferences": {"theme": "dark"}}}';
      const result: IValidationResponse = validator.isContentValid(validNestedJson);

      expect(result.isValid()).toBe(true);
      expect(result.getValidationError()).toBe('');
    });

    it('should return valid response for simple JSON values', () => {
      expect(validator.isContentValid('true').isValid()).toBe(true);
      expect(validator.isContentValid('false').isValid()).toBe(true);
      expect(validator.isContentValid('null').isValid()).toBe(true);
      expect(validator.isContentValid('42').isValid()).toBe(true);
      expect(validator.isContentValid('"hello"').isValid()).toBe(true);
    });

    it('should return invalid response for malformed JSON', () => {
      const invalidJson = '{"name": "John", "age":}';
      const result: IValidationResponse = validator.isContentValid(invalidJson);

      expect(result.isValid()).toBe(false);
      expect(result.getValidationError()).toContain('Error:');
    });

    it('should return invalid response for unclosed JSON object', () => {
      const invalidJson = '{"name": "John"';
      const result: IValidationResponse = validator.isContentValid(invalidJson);

      expect(result.isValid()).toBe(false);
      expect(result.getValidationError()).toContain('Error:');
    });

    it('should return invalid response for invalid JSON with trailing comma', () => {
      const invalidJson = '{"name": "John", "age": 30,}';
      const result: IValidationResponse = validator.isContentValid(invalidJson);

      expect(result.isValid()).toBe(false);
      expect(result.getValidationError()).toContain('Error:');
    });

    it('should return invalid response for non-JSON string', () => {
      const nonJson = 'This is just a regular string';
      const result: IValidationResponse = validator.isContentValid(nonJson);

      expect(result.isValid()).toBe(false);
      expect(result.getValidationError()).toContain('Error:');
    });

    it('should return invalid response for empty string', () => {
      const result: IValidationResponse = validator.isContentValid('');

      expect(result.isValid()).toBe(false);
      expect(result.getValidationError()).toContain('Error:');
    });

    it('should return invalid response for whitespace only', () => {
      const result: IValidationResponse = validator.isContentValid('   ');

      expect(result.isValid()).toBe(false);
      expect(result.getValidationError()).toContain('Error:');
    });
  });
});
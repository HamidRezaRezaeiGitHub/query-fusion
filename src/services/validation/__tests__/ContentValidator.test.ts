import ContentValidator from '../ContentValidator';
import { ContentType } from '../../../components/content/ContentType';
import { IValidationResponse } from '../../../components/query/IValidationResponse';

describe('ContentValidator', () => {
  describe('isContentValid', () => {
    describe('JSON content type', () => {
      it('should validate valid JSON content', () => {
        const validJson = '{"name": "test", "value": 123}';
        const result: IValidationResponse = ContentValidator.isContentValid(ContentType.JSON, validJson);

        expect(result.isValid()).toBe(true);
        expect(result.getValidationError()).toBe('');
      });

      it('should invalidate malformed JSON content', () => {
        const invalidJson = '{"name": "test", "value":}';
        const result: IValidationResponse = ContentValidator.isContentValid(ContentType.JSON, invalidJson);

        expect(result.isValid()).toBe(false);
        expect(result.getValidationError()).toContain('Error:');
      });
    });

    describe('XML content type', () => {
      it('should validate valid XML content', () => {
        const validXml = '<root><item>test</item></root>';
        const result: IValidationResponse = ContentValidator.isContentValid(ContentType.XML, validXml);

        expect(result.isValid()).toBe(true);
      });

      it('should invalidate malformed XML content', () => {
        const invalidXml = '<root><item>test</root>';
        const result: IValidationResponse = ContentValidator.isContentValid(ContentType.XML, invalidXml);

        expect(result.isValid()).toBe(false);
        expect(result.getValidationError()).toContain('Error:');
      });
    });

    describe('empty and whitespace content', () => {
      it('should return invalid for empty JSON content', () => {
        const result: IValidationResponse = ContentValidator.isContentValid(ContentType.JSON, '');

        expect(result.isValid()).toBe(false);
        expect(result.getValidationError()).toBe('Error: (Empty content!)');
      });

      it('should return invalid for empty XML content', () => {
        const result: IValidationResponse = ContentValidator.isContentValid(ContentType.XML, '');

        expect(result.isValid()).toBe(false);
        expect(result.getValidationError()).toBe('Error: (Empty content!)');
      });

      it('should return invalid for whitespace-only JSON content', () => {
        const result: IValidationResponse = ContentValidator.isContentValid(ContentType.JSON, '   \n  \t  ');

        expect(result.isValid()).toBe(false);
        expect(result.getValidationError()).toBe('Error: (Empty content!)');
      });

      it('should return invalid for whitespace-only XML content', () => {
        const result: IValidationResponse = ContentValidator.isContentValid(ContentType.XML, '   \n  \t  ');

        expect(result.isValid()).toBe(false);
        expect(result.getValidationError()).toBe('Error: (Empty content!)');
      });

      it('should return invalid for null content', () => {
        const result: IValidationResponse = ContentValidator.isContentValid(ContentType.JSON, null as any);

        expect(result.isValid()).toBe(false);
        expect(result.getValidationError()).toBe('Error: (Empty content!)');
      });

      it('should return invalid for undefined content', () => {
        const result: IValidationResponse = ContentValidator.isContentValid(ContentType.XML, undefined as any);

        expect(result.isValid()).toBe(false);
        expect(result.getValidationError()).toBe('Error: (Empty content!)');
      });
    });
  });
});
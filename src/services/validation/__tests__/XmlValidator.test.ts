import { XmlValidator } from '../XmlValidator';
import { IValidationResponse } from '../../../components/query/IValidationResponse';

describe('XmlValidator', () => {
  let validator: XmlValidator;

  beforeEach(() => {
    validator = new XmlValidator();
  });

  describe('isContentValid', () => {
    it('should return valid response for valid XML', () => {
      const validXml = '<root><item>test</item></root>';
      const result: IValidationResponse = validator.isContentValid(validXml);

      expect(result.isValid()).toBe(true);
    });

    it('should return valid response for XML with attributes', () => {
      const validXml = '<root id="1"><item name="test">content</item></root>';
      const result: IValidationResponse = validator.isContentValid(validXml);

      expect(result.isValid()).toBe(true);
    });

    it('should return valid response for XML with CDATA', () => {
      const validXml = '<root><![CDATA[Some text content]]></root>';
      const result: IValidationResponse = validator.isContentValid(validXml);

      expect(result.isValid()).toBe(true);
    });

    it('should return valid response for nested XML', () => {
      const validXml = `
        <catalog>
          <book id="1">
            <title>Sample Book</title>
            <author>John Doe</author>
            <chapters>
              <chapter number="1">Introduction</chapter>
              <chapter number="2">Content</chapter>
            </chapters>
          </book>
        </catalog>
      `;
      const result: IValidationResponse = validator.isContentValid(validXml);

      expect(result.isValid()).toBe(true);
    });

    it('should return valid response for self-closing tags', () => {
      const validXml = '<root><item/><another-item attr="value"/></root>';
      const result: IValidationResponse = validator.isContentValid(validXml);

      expect(result.isValid()).toBe(true);
    });

    it('should return valid response for XML with namespaces', () => {
      const validXml = '<root xmlns:ns="http://example.com"><ns:item>test</ns:item></root>';
      const result: IValidationResponse = validator.isContentValid(validXml);

      expect(result.isValid()).toBe(true);
    });

    it('should return invalid response for unclosed tag', () => {
      const invalidXml = '<root><item>test</root>';
      const result: IValidationResponse = validator.isContentValid(invalidXml);

      expect(result.isValid()).toBe(false);
      expect(result.getValidationError()).toContain('Error:');
    });

    it('should return invalid response for mismatched tags', () => {
      const invalidXml = '<root><item>test</other></root>';
      const result: IValidationResponse = validator.isContentValid(invalidXml);

      expect(result.isValid()).toBe(false);
      expect(result.getValidationError()).toContain('Error:');
    });

    it('should return invalid response for invalid attribute syntax', () => {
      const invalidXml = '<root item="unclosed attribute><content></content></root>';
      const result: IValidationResponse = validator.isContentValid(invalidXml);

      expect(result.isValid()).toBe(false);
      expect(result.getValidationError()).toContain('Error:');
    });

    it('should return invalid response for missing root element', () => {
      const invalidXml = 'just some text without xml structure';
      const result: IValidationResponse = validator.isContentValid(invalidXml);

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

    it('should return invalid response for malformed XML with multiple root elements', () => {
      const invalidXml = '<root1>content1</root1><root2>content2</root2>';
      const result: IValidationResponse = validator.isContentValid(invalidXml);

      expect(result.isValid()).toBe(false);
      expect(result.getValidationError()).toContain('Error:');
    });
  });
});
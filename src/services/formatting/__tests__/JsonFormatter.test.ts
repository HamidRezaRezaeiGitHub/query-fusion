import { JsonFormatter } from '../JsonFormatter';

describe('JsonFormatter', () => {
  let formatter: JsonFormatter;

  beforeEach(() => {
    formatter = new JsonFormatter();
  });

  describe('formatContent', () => {
    it('should format valid JSON with proper indentation', () => {
      const compactJson = '{"name":"John","age":30,"city":"New York"}';
      const result = formatter.formatContent(compactJson);

      expect(result).toBe('{\n  "name": "John",\n  "age": 30,\n  "city": "New York"\n}');
    });

    it('should format JSON array with proper indentation', () => {
      const compactJsonArray = '[{"id":1,"name":"item1"},{"id":2,"name":"item2"}]';
      const result = formatter.formatContent(compactJsonArray);
      
      const expected = '[\n  {\n    "id": 1,\n    "name": "item1"\n  },\n  {\n    "id": 2,\n    "name": "item2"\n  }\n]';
      expect(result).toBe(expected);
    });

    it('should format nested JSON objects', () => {
      const nestedJson = '{"user":{"name":"Jane","preferences":{"theme":"dark","notifications":true}}}';
      const result = formatter.formatContent(nestedJson);
      
      const expected = '{\n  "user": {\n    "name": "Jane",\n    "preferences": {\n      "theme": "dark",\n      "notifications": true\n    }\n  }\n}';
      expect(result).toBe(expected);
    });

    it('should handle already formatted JSON', () => {
      const formattedJson = '{\n  "name": "John",\n  "age": 30\n}';
      const result = formatter.formatContent(formattedJson);
      
      // Should still format correctly even if already formatted
      expect(result).toBe('{\n  "name": "John",\n  "age": 30\n}');
    });

    it('should handle primitive JSON values', () => {
      expect(formatter.formatContent('true')).toBe('true');
      expect(formatter.formatContent('false')).toBe('false');
      expect(formatter.formatContent('null')).toBe('null');
      expect(formatter.formatContent('42')).toBe('42');
      expect(formatter.formatContent('"hello"')).toBe('"hello"');
    });

    it('should return original content when JSON parsing fails', () => {
      const invalidJson = '{"name": "John", "age":}';
      const result = formatter.formatContent(invalidJson);
      
      expect(result).toBe(invalidJson);
    });

    it('should return original content for non-JSON string', () => {
      const nonJson = 'This is not JSON';
      const result = formatter.formatContent(nonJson);
      
      expect(result).toBe(nonJson);
    });

    it('should handle empty string', () => {
      const result = formatter.formatContent('');
      
      expect(result).toBe('');
    });

    it('should log error message for invalid JSON', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const invalidJson = '{"invalid": json}';
      
      formatter.formatContent(invalidJson);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Could not parse or beutify the JSON content!')
      );
      
      consoleSpy.mockRestore();
    });
  });
});
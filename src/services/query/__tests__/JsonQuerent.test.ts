import { JsonQuerent } from '../JsonQuerent';
import { IQueryResponse } from '../../../components/query/IQueryResponse';

describe('JsonQuerent', () => {
  let querent: JsonQuerent;

  beforeEach(() => {
    querent = new JsonQuerent();
  });

  describe('queryContent', () => {
    const sampleJson = `{
      "name": "John",
      "age": 30,
      "city": "New York",
      "hobbies": ["reading", "swimming", "coding"],
      "address": {
        "street": "123 Main St",
        "zip": "10001"
      },
      "contacts": [
        {"type": "email", "value": "john@example.com"},
        {"type": "phone", "value": "555-1234"}
      ]
    }`;

    it('should execute simple property queries', () => {
      const queries = ['$.name', '$.age', '$.city'];
      const results: IQueryResponse[] = querent.queryContent(sampleJson, queries);

      expect(results).toHaveLength(3);
      
      // Test name query
      expect(results[0].isValid()).toBe(true);
      expect(results[0].hasResult()).toBe(true);
      expect(results[0].getStringResultValue()).toContain('"John"');
      
      // Test age query
      expect(results[1].isValid()).toBe(true);
      expect(results[1].hasResult()).toBe(true);
      expect(results[1].getStringResultValue()).toContain('30');
      
      // Test city query
      expect(results[2].isValid()).toBe(true);
      expect(results[2].hasResult()).toBe(true);
      expect(results[2].getStringResultValue()).toContain('"New York"');
    });

    it('should execute array queries', () => {
      const queries = ['$.hobbies', '$.hobbies[0]', '$.hobbies[*]'];
      const results: IQueryResponse[] = querent.queryContent(sampleJson, queries);

      expect(results).toHaveLength(3);
      
      // Test full array query
      expect(results[0].isValid()).toBe(true);
      expect(results[0].hasResult()).toBe(true);
      expect(results[0].getStringResultValue()).toContain('reading');
      expect(results[0].getStringResultValue()).toContain('swimming');
      expect(results[0].getStringResultValue()).toContain('coding');
      
      // Test single element query
      expect(results[1].isValid()).toBe(true);
      expect(results[1].hasResult()).toBe(true);
      expect(results[1].getStringResultValue()).toContain('"reading"');
      
      // Test wildcard query
      expect(results[2].isValid()).toBe(true);
      expect(results[2].hasResult()).toBe(true);
      expect(results[2].isResultArray()).toBe(true);
      expect(results[2].getArrayResult()).toHaveLength(3);
    });

    it('should execute nested object queries', () => {
      const queries = ['$.address', '$.address.street', '$.address.zip'];
      const results: IQueryResponse[] = querent.queryContent(sampleJson, queries);

      expect(results).toHaveLength(3);
      
      // Test nested object query
      expect(results[0].isValid()).toBe(true);
      expect(results[0].hasResult()).toBe(true);
      expect(results[0].getStringResultValue()).toContain('123 Main St');
      expect(results[0].getStringResultValue()).toContain('10001');
      
      // Test nested property queries
      expect(results[1].isValid()).toBe(true);
      expect(results[1].hasResult()).toBe(true);
      expect(results[1].getStringResultValue()).toContain('"123 Main St"');
      
      expect(results[2].isValid()).toBe(true);
      expect(results[2].hasResult()).toBe(true);
      expect(results[2].getStringResultValue()).toContain('"10001"');
    });

    it('should execute complex array queries', () => {
      const queries = ['$.contacts[*].type', '$.contacts[?(@.type=="email")].value'];
      const results: IQueryResponse[] = querent.queryContent(sampleJson, queries);

      expect(results).toHaveLength(2);
      
      // Test array property extraction
      expect(results[0].isValid()).toBe(true);
      expect(results[0].hasResult()).toBe(true);
      expect(results[0].getStringResultValue()).toContain('"email"');
      expect(results[0].getStringResultValue()).toContain('"phone"');
      
      // Test filtered query
      expect(results[1].isValid()).toBe(true);
      expect(results[1].hasResult()).toBe(true);
      expect(results[1].getStringResultValue()).toContain('"john@example.com"');
    });

    it('should handle queries with no results', () => {
      const queries = ['$.nonexistent', '$.hobbies[10]', '$.address.country'];
      const results: IQueryResponse[] = querent.queryContent(sampleJson, queries);

      expect(results).toHaveLength(3);
      
      results.forEach(result => {
        expect(result.isValid()).toBe(true);
        expect(result.hasResult()).toBe(false);
        expect(result.getStringResultValue()).toBe('[]');
      });
    });

    it('should handle invalid JSONPath queries', () => {
      const queries = ['$[invalid', '$..[', '$...invalid'];
      const results: IQueryResponse[] = querent.queryContent(sampleJson, queries);

      expect(results).toHaveLength(3);
      
      results.forEach(result => {
        expect(result.isValid()).toBe(false);
        expect(result.getValidationError()).toBeTruthy();
      });
    });

    it('should handle root queries', () => {
      const queries = ['$', '$.*'];
      const results: IQueryResponse[] = querent.queryContent(sampleJson, queries);

      expect(results).toHaveLength(2);
      
      // Test root query
      expect(results[0].isValid()).toBe(true);
      expect(results[0].hasResult()).toBe(true);
      expect(results[0].getStringResultValue()).toContain('John');
      expect(results[0].getStringResultValue()).toContain('New York');
      
      // Test all properties query
      expect(results[1].isValid()).toBe(true);
      expect(results[1].hasResult()).toBe(true);
      expect(results[1].isResultArray()).toBe(true);
    });

    it('should handle malformed JSON input', () => {
      const malformedJson = '{"name": "John", "age":}';
      const queries = ['$.name'];
      
      expect(() => {
        querent.queryContent(malformedJson, queries);
      }).toThrow();
    });

    it('should handle empty queries array', () => {
      const results: IQueryResponse[] = querent.queryContent(sampleJson, []);
      
      expect(results).toHaveLength(0);
    });
  });
});
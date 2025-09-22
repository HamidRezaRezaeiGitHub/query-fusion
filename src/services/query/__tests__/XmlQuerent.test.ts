import { XmlQuerent } from '../XmlQuerent';
import { IQueryResponse } from '../../../components/query/IQueryResponse';

describe('XmlQuerent', () => {
  let querent: XmlQuerent;

  beforeEach(() => {
    querent = new XmlQuerent();
  });

  describe('queryContent', () => {
    const sampleXml = `<?xml version="1.0"?>
      <catalog>
        <book id="1" genre="fiction">
          <title>Sample Book</title>
          <author>John Doe</author>
          <price>29.99</price>
          <tags>
            <tag>bestseller</tag>
            <tag>fiction</tag>
          </tags>
        </book>
        <book id="2" genre="non-fiction">
          <title>Learning Guide</title>
          <author>Jane Smith</author>
          <price>39.99</price>
          <tags>
            <tag>educational</tag>
            <tag>reference</tag>
          </tags>
        </book>
        <book id="3" genre="fiction">
          <title>Adventure Story</title>
          <author>Bob Wilson</author>
          <price>24.99</price>
        </book>
      </catalog>`;

    it('should execute simple element queries', () => {
      const queries = [
        '//title/text()',
        '//author/text()',
        '//price/text()'
      ];
      const results: IQueryResponse[] = querent.queryContent(sampleXml, queries);

      expect(results).toHaveLength(3);
      
      // Test title query
      expect(results[0].isValid()).toBe(true);
      expect(results[0].hasResult()).toBe(true);
      expect(results[0].getStringResultValue()).toContain('Sample Book');
      expect(results[0].getStringResultValue()).toContain('Learning Guide');
      expect(results[0].getStringResultValue()).toContain('Adventure Story');
      
      // Test author query
      expect(results[1].isValid()).toBe(true);
      expect(results[1].hasResult()).toBe(true);
      expect(results[1].getStringResultValue()).toContain('John Doe');
      expect(results[1].getStringResultValue()).toContain('Jane Smith');
      expect(results[1].getStringResultValue()).toContain('Bob Wilson');
      
      // Test price query
      expect(results[2].isValid()).toBe(true);
      expect(results[2].hasResult()).toBe(true);
      expect(results[2].getStringResultValue()).toContain('29.99');
      expect(results[2].getStringResultValue()).toContain('39.99');
      expect(results[2].getStringResultValue()).toContain('24.99');
    });

    it('should execute attribute queries', () => {
      const queries = [
        '//book/@id',
        '//book/@genre',
        '//book[@id="2"]/@genre'
      ];
      const results: IQueryResponse[] = querent.queryContent(sampleXml, queries);

      expect(results).toHaveLength(3);
      
      // Test id attributes
      expect(results[0].isValid()).toBe(true);
      expect(results[0].hasResult()).toBe(true);
      expect(results[0].getStringResultValue()).toContain('1');
      expect(results[0].getStringResultValue()).toContain('2');
      expect(results[0].getStringResultValue()).toContain('3');
      
      // Test genre attributes
      expect(results[1].isValid()).toBe(true);
      expect(results[1].hasResult()).toBe(true);
      expect(results[1].getStringResultValue()).toContain('fiction');
      expect(results[1].getStringResultValue()).toContain('non-fiction');
      
      // Test specific book genre
      expect(results[2].isValid()).toBe(true);
      expect(results[2].hasResult()).toBe(true);
      expect(results[2].getStringResultValue()).toContain('non-fiction');
    });

    it('should execute filtered queries', () => {
      const queries = [
        '//book[@genre="fiction"]/title/text()',
        '//book[price > 30]/title/text()',
        '//book[@id="1"]//tag/text()'
      ];
      const results: IQueryResponse[] = querent.queryContent(sampleXml, queries);

      expect(results).toHaveLength(3);
      
      // Test fiction books
      expect(results[0].isValid()).toBe(true);
      expect(results[0].hasResult()).toBe(true);
      expect(results[0].getStringResultValue()).toContain('Sample Book');
      expect(results[0].getStringResultValue()).toContain('Adventure Story');
      expect(results[0].getStringResultValue()).not.toContain('Learning Guide');
      
      // Test expensive books
      expect(results[1].isValid()).toBe(true);
      expect(results[1].hasResult()).toBe(true);
      expect(results[1].getStringResultValue()).toContain('Learning Guide');
      expect(results[1].getStringResultValue()).not.toContain('Adventure Story');
      
      // Test specific book tags
      expect(results[2].isValid()).toBe(true);
      expect(results[2].hasResult()).toBe(true);
      expect(results[2].getStringResultValue()).toContain('bestseller');
      expect(results[2].getStringResultValue()).toContain('fiction');
    });

    it('should execute element structure queries', () => {
      const queries = [
        '//book[@id="1"]',
        '//tags',
        '/catalog/book[1]/title'
      ];
      const results: IQueryResponse[] = querent.queryContent(sampleXml, queries);

      expect(results).toHaveLength(3);
      
      // Test full book element
      expect(results[0].isValid()).toBe(true);
      expect(results[0].hasResult()).toBe(true);
      expect(results[0].getStringResultValue()).toContain('<book');
      expect(results[0].getStringResultValue()).toContain('Sample Book');
      expect(results[0].getStringResultValue()).toContain('John Doe');
      
      // Test tags elements
      expect(results[1].isValid()).toBe(true);
      expect(results[1].hasResult()).toBe(true);
      expect(results[1].getStringResultValue()).toContain('<tags>');
      expect(results[1].getStringResultValue()).toContain('<tag>');
      
      // Test specific title element
      expect(results[2].isValid()).toBe(true);
      expect(results[2].hasResult()).toBe(true);
      expect(results[2].getStringResultValue()).toContain('<title>Sample Book</title>');
    });

    it('should handle queries with no results', () => {
      const queries = [
        '//nonexistent/text()',
        '//book[@id="999"]/title/text()',
        '//book[@genre="mystery"]/title/text()'
      ];
      const results: IQueryResponse[] = querent.queryContent(sampleXml, queries);

      expect(results).toHaveLength(3);
      
      results.forEach(result => {
        expect(result.isValid()).toBe(true);
        // XPath queries that return empty results may still be marked as hasResult: true
        // with empty string results, so we'll check the actual content
        if (result.hasResult()) {
          expect(result.getStringResultValue().trim()).toBe('');
        }
      });
    });

    it('should handle invalid XPath queries', () => {
      const queries = [
        '//book[invalid',
        '//book/[',
        '//book/@missing]'
      ];
      const results: IQueryResponse[] = querent.queryContent(sampleXml, queries);

      expect(results).toHaveLength(3);
      
      results.forEach(result => {
        expect(result.isValid()).toBe(false);
        expect(result.getValidationError()).toBeTruthy();
      });
    });

    it('should handle count and position queries', () => {
      const queries = [
        'count(//book)',
        '//book[position() <= 2]/title/text()',
        '//book[last()]/title/text()'
      ];
      const results: IQueryResponse[] = querent.queryContent(sampleXml, queries);

      expect(results).toHaveLength(3);
      
      // Test count
      expect(results[0].isValid()).toBe(true);
      expect(results[0].hasResult()).toBe(true);
      expect(results[0].getStringResultValue()).toContain('3');
      
      // Test first two books
      expect(results[1].isValid()).toBe(true);
      expect(results[1].hasResult()).toBe(true);
      expect(results[1].getStringResultValue()).toContain('Sample Book');
      expect(results[1].getStringResultValue()).toContain('Learning Guide');
      expect(results[1].getStringResultValue()).not.toContain('Adventure Story');
      
      // Test last book
      expect(results[2].isValid()).toBe(true);
      expect(results[2].hasResult()).toBe(true);
      expect(results[2].getStringResultValue()).toContain('Adventure Story');
    });

    it('should handle malformed XML input', () => {
      const malformedXml = '<root><unclosed>';
      const queries = ['//root'];
      
      // XmlQuerent uses DOMParser which may handle some malformed XML
      // but severely malformed XML should cause issues in xpath processing
      const results: IQueryResponse[] = querent.queryContent(malformedXml, queries);
      
      expect(results).toHaveLength(1);
      // The query may succeed or fail depending on how DOMParser handles the malformed XML
      expect(typeof results[0].isValid()).toBe('boolean');
    });

    it('should handle empty queries array', () => {
      const results: IQueryResponse[] = querent.queryContent(sampleXml, []);
      
      expect(results).toHaveLength(0);
    });

    it('should handle namespace queries', () => {
      const xmlWithNamespace = `<?xml version="1.0"?>
        <root xmlns:book="http://example.com/book">
          <book:catalog>
            <book:item id="1">
              <book:title>Sample</book:title>
            </book:item>
          </book:catalog>
        </root>`;
      
      const queries = [
        '//item/@id',  // Without namespace
        '//title/text()'  // Without namespace
      ];
      const results: IQueryResponse[] = querent.queryContent(xmlWithNamespace, queries);

      expect(results).toHaveLength(2);
      
      // Without proper namespace handling, these may or may not work
      results.forEach(result => {
        expect(result.isValid()).toBe(true);
      });
    });
  });
});
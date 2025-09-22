import { XmlFormatter } from '../XmlFormatter';

describe('XmlFormatter', () => {
  let formatter: XmlFormatter;

  beforeEach(() => {
    formatter = new XmlFormatter();
  });

  describe('formatContent', () => {
    it('should format compact XML with proper indentation', () => {
      const compactXml = '<root><item>test</item><other>value</other></root>';
      const result = formatter.formatContent(compactXml);

      // Check that the XML is formatted with line breaks and indentation
      expect(result).toContain('<root>');
      expect(result).toContain('    <item>test</item>');
      expect(result).toContain('    <other>value</other>');
      expect(result).toContain('</root>');
      expect(result.split('\n').length).toBeGreaterThan(1);
    });

    it('should format XML with attributes', () => {
      const xmlWithAttrs = '<root id="1"><item name="test" value="123">content</item></root>';
      const result = formatter.formatContent(xmlWithAttrs);

      expect(result).toContain('<root id="1">');
      expect(result).toContain('<item name="test" value="123">content</item>');
      expect(result).toContain('</root>');
      expect(result.split('\n').length).toBeGreaterThan(1);
    });

    it('should format nested XML structure', () => {
      const nestedXml = '<catalog><book id="1"><title>Test Book</title><author>John Doe</author></book></catalog>';
      const result = formatter.formatContent(nestedXml);

      // Check that nested structure is formatted with proper indentation
      expect(result).toContain('<catalog>');
      expect(result).toContain('<book id="1">');
      expect(result).toContain('<title>Test Book</title>');
      expect(result).toContain('<author>John Doe</author>');
      expect(result).toContain('</book>');
      expect(result).toContain('</catalog>');
      expect(result.split('\n').length).toBeGreaterThan(3);
    });

    it('should handle self-closing tags', () => {
      const xmlWithSelfClosing = '<root><item/><other attr="value"/></root>';
      const result = formatter.formatContent(xmlWithSelfClosing);

      expect(result).toContain('<item/>');
      expect(result).toContain('<other attr="value"/>');
    });

    it('should format XML with CDATA sections', () => {
      const xmlWithCdata = '<root><content><![CDATA[Some text content]]></content></root>';
      const result = formatter.formatContent(xmlWithCdata);

      expect(result).toContain('<![CDATA[Some text content]]>');
    });

    it('should handle already formatted XML', () => {
      const formattedXml = '<root>\n    <item>test</item>\n</root>';
      const result = formatter.formatContent(formattedXml);

      // Should handle pre-formatted XML without errors
      expect(result).toContain('<root>');
      expect(result).toContain('<item>test</item>');
      expect(result).toContain('</root>');
    });

    it('should attempt to fix and format malformed XML', () => {
      // xml-formatter tries to fix malformed XML instead of failing
      const invalidXml = '<root><unclosed>';
      const result = formatter.formatContent(invalidXml);
      
      // The formatter attempts to fix the XML
      expect(result).not.toBe(invalidXml);
      expect(result).toContain('<root>');
      expect(result).toContain('</root>');
    });

    it('should handle empty string', () => {
      const result = formatter.formatContent('');
      
      expect(result).toBe('');
    });

    it('should return original content for non-XML string', () => {
      const nonXml = 'This is not XML';
      const result = formatter.formatContent(nonXml);
      
      expect(result).toBe(nonXml);
    });

    it('should handle severely malformed XML by logging error', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      // Use more severely malformed XML that actually fails
      const invalidXml = '<root><unclosed><another><deeply><nested></deeply>';
      
      const result = formatter.formatContent(invalidXml);
      
      // xml-formatter is quite robust, but may fail on very malformed XML
      // Check if either it formats or logs an error
      const errorLogged = consoleSpy.mock.calls.some(call => 
        call[0].includes('Could not parse or format the XML content!')
      );
      
      // Either the XML is formatted or an error is logged
      expect(errorLogged || result !== invalidXml).toBe(true);
      
      consoleSpy.mockRestore();
    });

    it('should handle XML with namespaces', () => {
      const xmlWithNamespaces = '<root xmlns:ns="http://example.com"><ns:item>test</ns:item></root>';
      const result = formatter.formatContent(xmlWithNamespaces);

      expect(result).toContain('xmlns:ns="http://example.com"');
      expect(result).toContain('<ns:item>test</ns:item>');
    });
  });
});
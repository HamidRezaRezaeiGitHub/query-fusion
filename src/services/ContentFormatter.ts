import { ContentType } from "../types/ContentType";
import xmlFormatter from "xml-formatter";

class ContentFormatter {
  public formatContent(contentType: ContentType, content: string): string {
    if (!content.trim()) {
      return "";
    }
    switch (contentType) {
      case ContentType.JSON:
        return this.formatJSON(content);
      case ContentType.XML:
        return this.formatXML(content);
      // Add cases for other content types
      default:
        return content;
    }
  }

  private formatJSON(content: string): string {
    try {
      const parsed = JSON.parse(content);
      return JSON.stringify(parsed, null, 2); // Beautify JSON
    } catch (e: any) {
      console.log(`Could not parse or beutify the JSON content! ${e.message}`);
      return content;
    }
  }

  private formatXML(content: string): string {
    try {
      return xmlFormatter(content, {
        indentation: "    ",
        collapseContent: true,
      });
    } catch (e: any) {
      console.log(`Could not parse or formt the XML content! ${e.message}`);
      return content;
    }
  }

  // Additional private methods for other content types
}

export default new ContentFormatter();

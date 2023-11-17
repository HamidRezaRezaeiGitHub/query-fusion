import { ContentType } from "../types/ContentType";

class ContentValidator {
  public isContentValid(contentType: ContentType, content: string): boolean {
    switch (contentType) {
      case ContentType.JSON:
        return this.isValidJSON(content);
      case ContentType.XML:
        return this.isValidXML(content);
      // Add cases for other content types
      default:
        return false;
    }
  }

  private isValidJSON(content: string): boolean {
    // JSON validation logic
    console.log("isValidJSON");
    return true;
  }

  private isValidXML(content: string): boolean {
    // XML validation logic
    return false;
  }

  // Additional private methods for other content types
}

export default new ContentValidator();

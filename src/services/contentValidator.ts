import { ContentType } from "../types/ContentType";
import { ValidationResponse } from "../types/ValidationResponse";

class ContentValidator {
  public isContentValid(
    contentType: ContentType,
    content: string
  ): ValidationResponse {
    if (!content.trim()) {
      return { isValid: false, validationError: "Error: (Empty content!)" };
    }
    switch (contentType) {
      case ContentType.JSON:
        return this.isValidJSON(content);
      case ContentType.XML:
        return this.isValidXML(content);
      // Add cases for other content types
      default:
        return { isValid: false, validationError: "" };
    }
  }

  private isValidJSON = (content: string) => {
    try {
      JSON.parse(content);
      return { isValid: true, validationError: "" };
    } catch (e: any) {
      return { isValid: false, validationError: `Error: ${e.message}` };
    }
  };

  private isValidXML(content: string): ValidationResponse {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(content, "application/xml");
    const parseError = xmlDoc.getElementsByTagName("parsererror");
    const errorMsg = (parseError[0]?.textContent || "")
      .replace("This page contains the following errors:", "")
      .replace("\nBelow is a rendering of the page up to the first error.", "");
    return {
      isValid: parseError.length === 0,
      validationError: `Error: ${errorMsg}`,
    };
  }

  // Additional private methods for other content types
}

export default new ContentValidator();

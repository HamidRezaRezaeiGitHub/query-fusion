import { ContentType } from "../types/ContentType";
import { ValidationResponse } from "../types/ValidationResponse";
import { IContentValidator } from "./IContentValidator";
import { JsonValidator } from "./json/JsonValidator";
import { XmlValidator } from "./xml/XmlValidator";

class ContentValidator {
  private jsonValidator: IContentValidator = new JsonValidator();
  private xmlValidator: IContentValidator = new XmlValidator();

  public isContentValid(
    contentType: ContentType,
    content: string
  ): ValidationResponse {
    if (!content?.trim()) {
      return { isValid: false, validationError: "Error: (Empty content!)" };
    }
    switch (contentType) {
      case ContentType.JSON:
        return this.jsonValidator.isContentValid(content);
      case ContentType.XML:
        return this.xmlValidator.isContentValid(content);
      // Add cases for other content types
      default:
        return { isValid: false, validationError: "Unsupported content type" };
    }
  }
}

export default new ContentValidator();

import { ContentType } from "../../model/content/ContentType";
import { ValidationResponse } from "../../model/validation/ValidationResponse";
import { IContentValidator } from "./IContentValidator";
import { JsonValidator } from "./JsonValidator";
import { XmlValidator } from "./XmlValidator";

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

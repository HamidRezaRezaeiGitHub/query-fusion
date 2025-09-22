import { ContentType } from "../../components/content/ContentType";
import { DefaultValidationResponse } from "../../components/query/DefaultValidationResponse";
import { IValidationResponse } from "../../components/query/IValidationResponse";
import { IContentValidator } from "./IContentValidator";
import { JsonValidator } from "./JsonValidator";
import { XmlValidator } from "./XmlValidator";

class ContentValidator {
  private jsonValidator: IContentValidator = new JsonValidator();
  private xmlValidator: IContentValidator = new XmlValidator();

  public isContentValid(
    contentType: ContentType,
    content: string
  ): IValidationResponse {
    if (!content?.trim()) {
      return new DefaultValidationResponse(false, "Error: (Empty content!)");
    }
    switch (contentType) {
      case ContentType.JSON:
        return this.jsonValidator.isContentValid(content);
      case ContentType.XML:
        return this.xmlValidator.isContentValid(content);
      // Add cases for other content types
      default:
        return new DefaultValidationResponse(false, "Unsupported content type");
    }
  }
}

export default new ContentValidator();

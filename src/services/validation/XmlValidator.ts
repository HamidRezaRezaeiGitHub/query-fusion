import { IContentValidator } from "./IContentValidator";
import { IValidationResponse } from "../../model/validation/IValidationResponse";
import { DefaultValidationResponse } from "../../model/validation/DefaultValidationResponse";

export class XmlValidator implements IContentValidator {
  isContentValid(content: string): IValidationResponse {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(content, "application/xml");
    const parseError = xmlDoc.getElementsByTagName("parsererror");
    const errorMsg = (parseError[0]?.textContent || "")
      .replace("This page contains the following errors:", "")
      .replace("\nBelow is a rendering of the page up to the first error.", "");
    return new DefaultValidationResponse(
      parseError.length === 0,
      `Error: ${errorMsg}`
    );
  }
}

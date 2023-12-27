import { IContentValidator } from "./IContentValidator";
import { ValidationResponse } from "../../model/validation/ValidationResponse";

export class XmlValidator implements IContentValidator {
  isContentValid(content: string): ValidationResponse {
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
}

import { IContentValidator } from "../IContentValidator";
import { ValidationResponse } from "../../types/ValidationResponse";

export class JsonValidator implements IContentValidator {
  isContentValid(content: string): ValidationResponse {
    try {
      JSON.parse(content);
      return { isValid: true, validationError: "" };
    } catch (e: any) {
      return { isValid: false, validationError: `Error: ${e.message}` };
    }
  }
}

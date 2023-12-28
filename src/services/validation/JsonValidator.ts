import { IContentValidator } from "./IContentValidator";
import { IValidationResponse } from "../../model/validation/IValidationResponse";
import { DefaultValidationResponse } from "../../model/validation/DefaultValidationResponse";

export class JsonValidator implements IContentValidator {
  isContentValid(content: string): IValidationResponse {
    try {
      JSON.parse(content);
      return new DefaultValidationResponse(true, "");
    } catch (e: any) {
      return new DefaultValidationResponse(false, `Error: ${e.message}`);
    }
  }
}

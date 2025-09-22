import { IContentValidator } from "./IContentValidator";
import { IValidationResponse } from "../../components/query/IValidationResponse";
import { DefaultValidationResponse } from "../../components/query/DefaultValidationResponse";

export class JsonValidator implements IContentValidator {
  isContentValid(content: string): IValidationResponse {
    try {
      JSON.parse(content);
      return new DefaultValidationResponse(true, "");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Unknown validation error";
      return new DefaultValidationResponse(false, `Error: ${message}`);
    }
  }
}

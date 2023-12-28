import { IValidationResponse } from "../../model/validation/IValidationResponse";

export interface IContentValidator {
  isContentValid(content: string): IValidationResponse;
}

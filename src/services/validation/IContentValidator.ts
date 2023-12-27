import { ValidationResponse } from "../../model/validation/ValidationResponse";

export interface IContentValidator {
  isContentValid(content: string): ValidationResponse;
}

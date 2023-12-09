import { ValidationResponse } from "../types/ValidationResponse";

export interface IContentValidator {
  isContentValid(content: string): ValidationResponse;
}

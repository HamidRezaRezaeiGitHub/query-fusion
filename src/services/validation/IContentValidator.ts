import { IValidationResponse } from "../../components/query/IValidationResponse";

export interface IContentValidator {
  isContentValid(content: string): IValidationResponse;
}

import { IValidationResponse } from "./IValidationResponse";

export class DefaultValidationResponse implements IValidationResponse {
  private isResponseValid: boolean;
  private validationError: string;

  constructor(isResponseValid: boolean, validationError: string) {
    this.isResponseValid = isResponseValid;
    this.validationError = validationError?.trim() || "";
  }

  isValid = (): boolean => {
    return this.isResponseValid;
  };
  getValidationError = (): string => {
    return this.validationError;
  };
}

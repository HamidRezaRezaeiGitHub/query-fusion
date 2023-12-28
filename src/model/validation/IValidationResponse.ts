export interface IValidationResponse {
  isValid(): boolean;
  getValidationError(): string;
}

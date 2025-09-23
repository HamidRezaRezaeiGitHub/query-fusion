export interface IQueryResponse {
  isValid(): boolean;
  getValidationError(): string;
  hasResult(): boolean;
  getStringResultValue(): string;
  isResultArray(): boolean;
  getArrayResult(): Array<unknown>;
}

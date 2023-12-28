export interface IQueryResponse {
  isValid(): boolean;
  getValidationError(): string;
  hasResult(): boolean;
  getStringResultValu(): string;
  isResultArray(): boolean;
  getArrayResult(): Array<Node>;
}

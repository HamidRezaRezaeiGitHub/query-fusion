import { IQueryResponse } from "./IQueryResponse";

export class DefaultQueryResponse implements IQueryResponse {
  private isValidQuery: boolean;
  private validationError: string;
  private hasResultValue: boolean;
  private stringResult: string;
  private isArray: boolean;
  private resultArray: Array<unknown>;

  constructor(builder: DefaultQueryResponseBuilder) {
    this.isValidQuery = builder.isValidQuery;
    this.validationError = builder.validationError;
    this.hasResultValue = builder.hasResultValue;
    this.stringResult = builder.stringResult;
    this.isArray = builder.isArray;
    this.resultArray = builder.resultArray;
  }

  static builder(): DefaultQueryResponseBuilder {
    return new DefaultQueryResponseBuilder();
  }

  isValid = (): boolean => {
    return this.isValidQuery;
  };
  getValidationError = (): string => {
    return this.validationError;
  };
  hasResult = (): boolean => {
    return this.hasResultValue;
  };
  getStringResultValu = (): string => {
    return this.stringResult;
  };
  isResultArray = (): boolean => {
    return this.isArray;
  };
  getArrayResult = (): Array<unknown> => {
    return this.resultArray;
  };
}

class DefaultQueryResponseBuilder {
  isValidQuery: boolean = false;
  validationError: string = "";
  hasResultValue: boolean = false;
  stringResult: string = "";
  isArray: boolean = false;
  resultArray: Array<unknown> = Array.of();

  setQueryValidity(isValid: boolean): DefaultQueryResponseBuilder {
    this.isValidQuery = isValid;
    return this;
  }

  setValidationError(errorMsg: string): DefaultQueryResponseBuilder {
    this.validationError = errorMsg;
    return this;
  }

  setHasResult(hasResult: boolean): DefaultQueryResponseBuilder {
    this.hasResultValue = hasResult;
    return this;
  }

  setStringResult(stringResult: string): DefaultQueryResponseBuilder {
    this.stringResult = stringResult;
    return this;
  }

  setIsArray(isArray: boolean): DefaultQueryResponseBuilder {
    this.isArray = isArray;
    return this;
  }

  setResultArray(resultArray: Array<unknown>): DefaultQueryResponseBuilder {
    this.resultArray = resultArray;
    return this;
  }

  build(): DefaultQueryResponse {
    return new DefaultQueryResponse(this);
  }
}

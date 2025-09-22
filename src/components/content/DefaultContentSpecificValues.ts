import { IContentSpecificValues } from "./IContentSpecificValues";

export class DefaultContentSpecificValues implements IContentSpecificValues {
  private content: string;
  private query: string;
  private result: string;

  constructor() {
    this.content = "";
    this.query = "";
    this.result = "";
  }

  setContent(newContent: string): void {
    this.content = newContent?.trim() || "";
  }
  setQuery(newQuery: string): void {
    this.query = newQuery?.trim() || "";
  }
  setResult(newResult: string): void {
    this.result = newResult?.trim() || "";
  }

  getContent(): string {
    return this.content;
  }
  getQuery(): string {
    return this.query;
  }
  getResult(): string {
    return this.result;
  }
}

export interface IContentSpecificValues {
  getContent(): string;
  getQuery(): string;
  getResult(): string;
  setContent(newContent: string): void;
  setQuery(newQuery: string): void;
  setResult(newResult: string): void;
}

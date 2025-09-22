import { ContentType } from "./ContentType";
export interface IContentSpecificMap {
  getContent(contentType: ContentType): string;
  getQuery(contentType: ContentType): string;
  getResult(contentType: ContentType): string;
  setContent(contentType: ContentType, newContent: string): void;
  setQuery(contentType: ContentType, newQuery: string): void;
  setResult(contentType: ContentType, newResult: string): void;
}

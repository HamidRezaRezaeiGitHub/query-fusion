import { IContentSpecificValues } from "./IContentSpecificValues";
import { ContentType } from "./ContentType";
import { IContentSpecificMap } from "./IContentSpecificMap";
import { DefaultContentSpecificValues } from "./DefaultContentSpecificValues";

export class DefaultContentSpecificMap implements IContentSpecificMap {
  private map: Map<ContentType, IContentSpecificValues>;

  constructor() {
    this.map = new Map<ContentType, IContentSpecificValues>();
  }

  private ensureContentTypeExists(contentType: ContentType): void {
    if (!this.map.has(contentType)) {
      this.map.set(contentType, new DefaultContentSpecificValues());
    }
  }

  getContent = (contentType: ContentType): string => {
    this.ensureContentTypeExists(contentType);
    return this.map.get(contentType)!.getContent();
  };
  getQuery = (contentType: ContentType): string => {
    this.ensureContentTypeExists(contentType);
    return this.map.get(contentType)!.getQuery();
  };
  getResult = (contentType: ContentType): string => {
    this.ensureContentTypeExists(contentType);
    return this.map.get(contentType)!.getResult();
  };

  setContent = (contentType: ContentType, newContent: string): void => {
    this.ensureContentTypeExists(contentType);
    this.map.get(contentType)!.setContent(newContent);
  };
  setQuery = (contentType: ContentType, newQuery: string): void => {
    this.ensureContentTypeExists(contentType);
    this.map.get(contentType)!.setQuery(newQuery);
  };
  setResult = (contentType: ContentType, newResult: string): void => {
    this.ensureContentTypeExists(contentType);
    this.map.get(contentType)!.setResult(newResult);
  };
}

import { ContentType } from "../types/ContentType";
import { IContentFormatter } from "./IContentFormatter";
import { JsonFormatter } from "./json/JsonFormatter";
import { XmlFormatter } from "./xml/XmlFormatter";

class ContentFormatter {
  private jsonFormatter: IContentFormatter = new JsonFormatter();
  private xmlFormatter: IContentFormatter = new XmlFormatter();

  public formatContent(contentType: ContentType, content: string): string {
    if (!content?.trim()) {
      return "";
    }
    switch (contentType) {
      case ContentType.JSON:
        return this.jsonFormatter.formatContent(content);
      case ContentType.XML:
        return this.xmlFormatter.formatContent(content);
      // Add cases for other content types
      default:
        return content;
    }
  }
}

export default new ContentFormatter();

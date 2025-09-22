import { ContentType } from "../../components/content/ContentType";
import { IQueryResponse } from "../../components/query/IQueryResponse";
import { IContentQuerent } from "./IContentQuerent";
import { JsonQuerent } from "./JsonQuerent";
import { XmlQuerent } from "./XmlQuerent";

class ContentQuerent {
  private jsonQuerent: IContentQuerent = new JsonQuerent();
  private xmlQuerent: IContentQuerent = new XmlQuerent();

  public queryContent(
    contentType: ContentType,
    content: string,
    queries: string[]
  ): IQueryResponse[] {
    switch (contentType) {
      case ContentType.JSON:
        return this.jsonQuerent.queryContent(content, queries);
      case ContentType.XML:
        return this.xmlQuerent.queryContent(content, queries);
      default:
        throw new Error(
          "Unsupported content type for querying: " + contentType
        );
    }
  }
}

export default new ContentQuerent();

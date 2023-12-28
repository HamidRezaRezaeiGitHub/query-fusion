import { DefaultQueryResponse } from "../../model/query/DefaultQueryResponse";
import { IQueryResponse } from "../../model/query/IQueryResponse";
import { IContentQuerent } from "./IContentQuerent";
import { DOMParser, XMLSerializer } from "xmldom";
import xpath from "xpath";

export class XmlQuerent implements IContentQuerent {
  queryContent(content: string, queries: string[]): IQueryResponse[] {
    const doc = new DOMParser().parseFromString(content);
    return queries.map((query) => this.processQuery(doc, query));
  }

  private processQuery(doc: Document, query: string): IQueryResponse {
    let queryResponseBuilder = DefaultQueryResponse.builder();
    try {
      let result = xpath.select(query, doc);
      queryResponseBuilder.setQueryValidity(true);
      // converting single Node result to an Array<Node> with 1 element
      if (
        result &&
        typeof result === "object" &&
        !Array.isArray(result) &&
        result.nodeType
      ) {
        result = [result];
      }

      if (Array.isArray(result)) {
        const stringValue = result
          .map((node) =>
            node.nodeType === node.TEXT_NODE
              ? node.nodeValue
              : new XMLSerializer().serializeToString(node)
          )
          .join("\n");
        queryResponseBuilder
          .setHasResult(true)
          .setStringResult(stringValue)
          .setIsArray(true)
          .setResultArray(result);
      } else if (result) {
        queryResponseBuilder
          .setHasResult(true)
          .setStringResult(String(result))
          .setIsArray(false);
      }
    } catch (error: any) {
      queryResponseBuilder
        .setQueryValidity(false)
        .setValidationError(error.message);
    }

    return queryResponseBuilder.build();
  }
}

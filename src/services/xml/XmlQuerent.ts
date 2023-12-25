import { QueryResponse } from "../../types/QueryResponse";
import { IContentQuerent } from "../IContentQuerent";
import { DOMParser, XMLSerializer } from "xmldom";
import xpath from "xpath";

export class XmlQuerent implements IContentQuerent {
  queryContent(content: string, queries: string[]): QueryResponse[] {
    const doc = new DOMParser().parseFromString(content);
    return queries.map((query) => this.processQuery(doc, query));
  }

  private processQuery(doc: Document, query: string): QueryResponse {
    let result = xpath.select(query, doc);
    // converting single Node result to an Array<Node> with 1 element
    if (
      result &&
      typeof result === "object" &&
      !Array.isArray(result) &&
      result.nodeType
    ) {
      result = [result];
    }

    let queryResponse: QueryResponse = {
      isValid: result !== null,
      stringValue: "",
      isNodeArray: Array.isArray(result),
      nodes: [],
    };

    if (Array.isArray(result)) {
      queryResponse.stringValue = result
        .map((node) =>
          node.nodeType === node.TEXT_NODE
            ? node.nodeValue
            : new XMLSerializer().serializeToString(node)
        )
        .join("\n");
      queryResponse.nodes = result;
    } else if (result) {
      queryResponse.stringValue = String(result);
    }
    return queryResponse;
  }
}

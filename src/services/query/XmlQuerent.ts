import { DefaultQueryResponse } from "../../components/query/DefaultQueryResponse";
import { IQueryResponse } from "../../components/query/IQueryResponse";
import { IContentQuerent } from "./IContentQuerent";
import { DOMParser, XMLSerializer } from "xmldom";
import xpath from "xpath";

const isNode = (value: unknown): value is Node => {
  return (
    typeof value === "object" &&
    value !== null &&
    "nodeType" in value &&
    typeof (value as { nodeType?: unknown }).nodeType === "number"
  );
};

export class XmlQuerent implements IContentQuerent {
  queryContent(content: string, queries: string[]): IQueryResponse[] {
    const doc = new DOMParser().parseFromString(content);
    return queries.map((query) => this.processQuery(doc, query));
  }

  private processQuery(doc: Document, query: string): IQueryResponse {
    const queryResponseBuilder = DefaultQueryResponse.builder();
    try {
      let result: unknown = xpath.select(query, doc);
      queryResponseBuilder.setQueryValidity(true);
      // converting single Node result to an Array<Node> with 1 element
      if (isNode(result)) {
        result = [result];
      }

      if (Array.isArray(result)) {
        const stringValue = result
          .map((node) =>
            isNode(node)
              ? node.nodeType === node.TEXT_NODE
                ? node.nodeValue ?? ""
                : new XMLSerializer().serializeToString(node)
              : String(node)
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
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      queryResponseBuilder
        .setQueryValidity(false)
        .setValidationError(message);
    }

    return queryResponseBuilder.build();
  }
}

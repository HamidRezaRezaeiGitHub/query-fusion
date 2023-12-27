import { QueryResponse } from "../../model/query/QueryResponse";
import { IContentQuerent } from "./IContentQuerent";
import jsonpath from "jsonpath";

export class JsonQuerent implements IContentQuerent {
  queryContent(content: string, queries: string[]): QueryResponse[] {
    const json = JSON.parse(content);
    return queries.map((query) => this.processQuery(json, query));
  }

  private processQuery(json: any, query: string): QueryResponse {
    let result = jsonpath.query(json, query);

    // Convert single result to an array for consistency
    if (!Array.isArray(result)) {
      result = result ? [result] : [];
    }

    let queryResponse: QueryResponse = {
      isValid: result.length > 0,
      stringValue: JSON.stringify(result, null, 2),
      isNodeArray: Array.isArray(result) && result.length > 1,
      nodes: result,
    };

    return queryResponse;
  }
}

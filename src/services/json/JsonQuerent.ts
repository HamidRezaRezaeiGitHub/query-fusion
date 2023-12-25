import { QueryResponse } from "../../types/QueryResponse";
import { IContentQuerent } from "../IContentQuerent";

export class JsonQuerent implements IContentQuerent {
  queryContent(content: string, queries: string[]): QueryResponse[] {
    return queries.map((query) => this.processQuery(content, query));
  }

  private processQuery(content: string, query: string): QueryResponse {
    let queryResponse: QueryResponse = {
      isValid: false,
      stringValue: "",
      isNodeArray: false,
      nodes: [],
    };

    return queryResponse;
  }
}

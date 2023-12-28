import { DefaultQueryResponse } from "../../model/query/DefaultQueryResponse";
import { IQueryResponse } from "../../model/query/IQueryResponse";
import { IContentQuerent } from "./IContentQuerent";
import jsonpath from "jsonpath";

export class JsonQuerent implements IContentQuerent {
  queryContent(content: string, queries: string[]): IQueryResponse[] {
    const json = JSON.parse(content);
    return queries.map((query) => this.processQuery(json, query));
  }

  private processQuery(json: any, query: string): IQueryResponse {
    let queryResponseBuilder = DefaultQueryResponse.builder();
    try {
      let result = jsonpath.query(json, query);
      queryResponseBuilder.setQueryValidity(true);
      // Convert single result to an array for consistency
      if (!Array.isArray(result)) {
        result = result ? [result] : [];
      }
      queryResponseBuilder
        .setHasResult(result.length > 0)
        .setStringResult(JSON.stringify(result, null, 2))
        .setIsArray(Array.isArray(result) && result.length > 1)
        .setResultArray(result);
    } catch (error: any) {
      queryResponseBuilder
        .setQueryValidity(false)
        .setValidationError(error.message);
    }

    return queryResponseBuilder.build();
  }
}

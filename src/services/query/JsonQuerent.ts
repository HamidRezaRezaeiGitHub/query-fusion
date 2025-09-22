import { DefaultQueryResponse } from "../../components/query/DefaultQueryResponse";
import { IQueryResponse } from "../../components/query/IQueryResponse";
import { IContentQuerent } from "./IContentQuerent";
import jsonpath from "jsonpath";

export class JsonQuerent implements IContentQuerent {
  queryContent(content: string, queries: string[]): IQueryResponse[] {
    const json = JSON.parse(content);
    return queries.map((query) => this.processQuery(json, query));
  }

  private processQuery(json: unknown, query: string): IQueryResponse {
    const queryResponseBuilder = DefaultQueryResponse.builder();
    try {
      let result: unknown[] = jsonpath.query(json, query);
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
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      queryResponseBuilder
        .setQueryValidity(false)
        .setValidationError(message);
    }

    return queryResponseBuilder.build();
  }
}

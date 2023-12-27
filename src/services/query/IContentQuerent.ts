import { QueryResponse } from "../../model/query/QueryResponse";

export interface IContentQuerent {
  queryContent(content: string, queries: string[]): QueryResponse[];
}

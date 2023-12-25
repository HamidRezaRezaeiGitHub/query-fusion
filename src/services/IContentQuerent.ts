import { QueryResponse } from "../types/QueryResponse";

export interface IContentQuerent {
  queryContent(content: string, queries: string[]): QueryResponse[];
}

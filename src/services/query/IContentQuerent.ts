import { IQueryResponse } from "../../model/query/IQueryResponse";

export interface IContentQuerent {
  queryContent(content: string, queries: string[]): IQueryResponse[];
}

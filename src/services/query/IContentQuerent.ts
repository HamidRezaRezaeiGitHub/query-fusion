import { IQueryResponse } from "../../components/query/IQueryResponse";

export interface IContentQuerent {
  queryContent(content: string, queries: string[]): IQueryResponse[];
}

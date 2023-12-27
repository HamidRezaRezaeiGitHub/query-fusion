import { ContentSpecificValues } from "./ContentSpecificValues";

export class DefaultContentSpecificValues implements ContentSpecificValues {
  content = "";
  query = "";
  result = "";

  constructor(init?: Partial<ContentSpecificValues>) {
    Object.assign(this, init);
  }
}

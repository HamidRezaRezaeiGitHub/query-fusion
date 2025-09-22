import { createContext } from "react";
import { ContentType } from "../components/content/ContentType";

export interface ContentTypeContextType {
  contentType: ContentType;
  setContentType: (contentType: ContentType) => void;
}

export const ContentTypeContext = createContext<ContentTypeContextType | undefined>(undefined);
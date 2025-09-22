import { useContext } from "react";
import { ContentTypeContext } from "./contentTypeContext";

export const useContentType = () => {
  const context = useContext(ContentTypeContext);
  if (context === undefined) {
    throw new Error("useContentType must be used within a ContentTypeProvider");
  }
  return context;
};
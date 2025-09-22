import { useState, ReactNode } from "react";
import { ContentType } from "../components/content/ContentType";
import { ContentTypeContext, ContentTypeContextType } from "./contentTypeContext";

interface ContentTypeProviderProps {
  children: ReactNode;
}

const ContentTypeProvider = ({ children }: ContentTypeProviderProps) => {
  const [contentType, setContentType] = useState<ContentType>(ContentType.XML);

  const value: ContentTypeContextType = {
    contentType,
    setContentType,
  };

  return (
    <ContentTypeContext.Provider value={value}>
      {children}
    </ContentTypeContext.Provider>
  );
};

export default ContentTypeProvider;
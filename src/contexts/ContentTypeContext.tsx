import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ContentType } from '../components/content/ContentType';

export interface ContentTypeContextType {
  contentType: ContentType;
  setContentType: (contentType: ContentType) => void;
}

const ContentTypeContext = createContext<ContentTypeContextType | undefined>(undefined);

interface ContentTypeProviderProps {
  children: ReactNode;
  defaultContentType?: ContentType;
}

/**
 * ContentTypeProvider component that manages application content type state.
 * Supports JSON and XML content types.
 * 
 * Features:
 * - JSON and XML content type support
 * - Centralized content type management
 */
export const ContentTypeProvider: React.FC<ContentTypeProviderProps> = ({ 
  children, 
  defaultContentType = ContentType.XML
}) => {
  const [contentType, setContentType] = useState<ContentType>(defaultContentType);

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

/**
 * Hook to use content type context
 * @returns ContentTypeContextType object with content type state and controls
 * @throws Error if used outside of ContentTypeProvider
 */
export const useContentType = (): ContentTypeContextType => {
  const context = useContext(ContentTypeContext);
  if (context === undefined) {
    throw new Error('useContentType must be used within a ContentTypeProvider');
  }
  return context;
};

export default ContentTypeProvider;
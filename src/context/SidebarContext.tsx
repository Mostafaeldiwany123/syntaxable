import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

interface SidebarContextType {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  setCollapsed: (collapsed: boolean) => void;
  // For AI Agent to control sidebar
  collapseForAIAgent: () => void;
  restoreFromAIAgent: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const wasCollapsedBeforeAIRef = useRef(false);
  const isAIAgentControllingRef = useRef(false);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  const setCollapsed = useCallback((collapsed: boolean) => {
    setIsCollapsed(collapsed);
  }, []);

  const collapseForAIAgent = useCallback(() => {
    // Only save state if we're not already controlling
    if (!isAIAgentControllingRef.current) {
      wasCollapsedBeforeAIRef.current = isCollapsed;
    }
    isAIAgentControllingRef.current = true;
    setIsCollapsed(true);
  }, [isCollapsed]);

  const restoreFromAIAgent = useCallback(() => {
    if (isAIAgentControllingRef.current) {
      setIsCollapsed(wasCollapsedBeforeAIRef.current);
      isAIAgentControllingRef.current = false;
    }
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleCollapse,
        setCollapsed,
        collapseForAIAgent,
        restoreFromAIAgent,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export default SidebarContext;
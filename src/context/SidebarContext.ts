import { createContext, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";

export interface SidebarContextValue {
  isSidebarOpen: boolean,
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>,
}

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export const useSidebarContext = () => {
  const ctx = useContext(SidebarContext)

  if (!ctx) {
    throw new Error('useSidebarContext must be used within SidebarContextProvider')
  }

  return ctx;
}
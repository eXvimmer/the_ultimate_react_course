import { createContext, useContext, useEffect } from "react";
import { ChildrenProps } from "../types";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

type DarkModeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const userDefault = window.matchMedia("(prefers-color-scheme: dark)").matches;

const DarkModeContext = createContext<DarkModeContextType>({
  isDarkMode: userDefault,
} as DarkModeContextType);

export function DarkModeProvider({ children }: ChildrenProps) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    userDefault,
    "isDarkMode",
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode() {
          setIsDarkMode((isDark) => !isDark);
        },
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode should be used inside a DarkModeProvider");
  }
  return context;
}

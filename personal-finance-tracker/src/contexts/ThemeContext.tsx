import React, { createContext, useState } from "react";

interface iThemeContext {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

interface iThemeProvider {
  children: React.ReactNode;
}

const ThemesContext = createContext({} as iThemeContext);

function ThemesProvider({ children }: iThemeProvider) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemesContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemesContext.Provider>
  );
}

export { ThemesContext, ThemesProvider };

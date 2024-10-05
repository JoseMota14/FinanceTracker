import { useContext } from "react";
import { ThemesContext } from "../contexts";

export function useTheme() {
  const context = useContext(ThemesContext);

  return context;
}

import { createTheme, PaletteMode } from "@mui/material";
import { useMemo, useState } from "react";
import { themeSettings } from "./theme";

export const useColorTheme = () => {
  const [mode, setMode] = useState<PaletteMode>("light");

  const toggleColorMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const updatedTheme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return {
    theme: updatedTheme,
    mode,
    toggleColorMode,
  };
};

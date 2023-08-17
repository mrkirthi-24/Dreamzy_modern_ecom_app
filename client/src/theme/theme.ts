import { PaletteMode } from "@mui/material";

//mui theme settings
export const themeSettings = (mode: PaletteMode) => {
  return {
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: "#fff",
            },
            secondary: {
              main: "#808080",
            },
            background: {
              default: "#27285C",
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: "#f2f229",
            },
            secondary: {
              main: "#808080",
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
  };
};

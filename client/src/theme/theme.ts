import { PaletteMode } from "@mui/material";
import { amber, blueGrey } from "@mui/material/colors";

//mui theme settings
export const themeSettings = (mode: PaletteMode) => {
  return {
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: blueGrey,
            background: {
              default: "#000000",
            },
          }
        : {
            // palette values for light mode
            primary: amber,
            background: {
              default: "#fcfcfc",
            },
          }),
    },
  };
};

import React from "react";
import { useRecoilValue } from "recoil";
import { darkTheme, lightTheme } from "./theme";
import { themeState } from "../store/atoms/themeState";
import { CssBaseline, ThemeProvider } from "@mui/material";

const ThemedApp: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const currentTheme = useRecoilValue(themeState);

  return (
    <ThemeProvider theme={currentTheme === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemedApp;

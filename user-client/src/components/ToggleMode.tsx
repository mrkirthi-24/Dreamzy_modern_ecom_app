import { IconButton } from "@mui/material";
import { useRecoilState } from "recoil";
import { themeState } from "../store/atoms/themeState";
import { Brightness4, Brightness7 } from "@mui/icons-material";

export const ToggleMode: React.FC = () => {
  const [currentTheme, setTheme] = useRecoilState(themeState);

  const toggleTheme = () => {
    setTheme(currentTheme === "light" ? "dark" : "light");
  };

  return (
    <IconButton size="large" color="inherit" onClick={toggleTheme}>
      {currentTheme === "light" ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  );
};

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import { Box, IconButton } from "@mui/material";
import { useThemeContext } from "../theme/ThemeContextProvider";

function NavBar(): JSX.Element {
  const { mode, toggleColorMode } = useThemeContext();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SettingsSuggestIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={logoStyles}
          >
            myAdmin
          </Typography>
          <Box>
            <IconButton onClick={toggleColorMode}>
              {mode === "dark" ? <DarkModeOutlined /> : <LightModeOutlined />}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

//styles objects for above components

const logoStyles = {
  mr: 2,
  display: { xs: "none", md: "flex" },
  fontWeight: 400,
  letterSpacing: ".3rem",
  color: "inherit",
  textDecoration: "none",
};

export default NavBar;

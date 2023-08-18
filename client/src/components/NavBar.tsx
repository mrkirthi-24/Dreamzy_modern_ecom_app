import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import { useThemeContext } from "../theme/ThemeContextProvider";

function NavBar(): JSX.Element {
  const { mode, toggleColorMode } = useThemeContext();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box display="flex">
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
          </Box>
          <Paper sx={{ width: "50%" }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="search-input">Search</InputLabel>
              <OutlinedInput
                id="search-input"
                type="text"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="search component">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                label="Search"
              />
            </FormControl>
          </Paper>
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
  fontWeight: 600,
  letterSpacing: ".3rem",
  color: "inherit",
  textDecoration: "none",
};

export default NavBar;

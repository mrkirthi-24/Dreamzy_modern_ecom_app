import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  OutlinedInput,
  Paper,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { deepOrange } from "@mui/material/colors";
import { useThemeContext } from "../theme/ThemeContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authTokenState } from "../store/selectors/authToken";
import { adminEmailState } from "../store/selectors/adminEmail";
import { adminState } from "../store/atoms/admin";

function NavBar(): JSX.Element {
  const { mode, toggleColorMode } = useThemeContext();
  const authToken = useRecoilValue(authTokenState);
  const adminEmail = useRecoilValue(adminEmailState);

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
          <Box display="flex">
            <IconButton onClick={toggleColorMode}>
              {mode === "dark" ? <DarkModeOutlined /> : <LightModeOutlined />}
            </IconButton>
            {authToken ? (
              <UserMenu email={adminEmail} />
            ) : (
              <>
                <Button>
                  <Link to="/login">Login</Link>
                </Button>
                <Button>
                  <Link to="/signup">SignUp</Link>
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

//Avatar button with Menu
function UserMenu(props: { email: string | null }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const setAdminState = useSetRecoilState(adminState);
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAdminState((prevState) => ({
      ...prevState,
      authToken: null,
      adminEmail: "",
    }));
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("admin");
    navigate("/");
  };
  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar sx={{ bgcolor: deepOrange[500] }}>
          {props.email ? props.email.charAt(0).toUpperCase() : ""}
        </Avatar>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>My Account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
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

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Search } from "./Search";
import { Typography } from "@mui/material";
import NavBarButtons from "./NavBarButtons";

const NavBar: React.FC = () => {
  return (
    <Box mb={10}>
      <AppBar position="fixed">
        <Toolbar>
          <a href="/" style={{ color: "White", marginLeft: 60 }}>
            <IconButton edge="start" color="inherit" aria-label="home button">
              <Box sx={{ fontWeight: 900 }}>
                <p>Wh*tTf!</p>
                <Typography color="yellow" variant="subtitle1" marginTop={-2}>
                  <em>World</em>
                </Typography>
              </Box>
            </IconButton>
          </a>

          {/* Seach Bar ------------------------------------------------- */}
          <Search />

          {/* Nav Icons ------------------------------------------------- */}
          <NavBarButtons />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;

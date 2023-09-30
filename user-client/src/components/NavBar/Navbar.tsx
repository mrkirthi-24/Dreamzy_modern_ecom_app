import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Search } from "./Search";
import { styled, Typography } from "@mui/material";
import NavBarButtons from "./NavBarButtons";

const NavBar: React.FC = () => {
  return (
    <Box mb={10}>
      <AppBar position="fixed">
        <ResponsiveBar>
          <a href="/" style={{ color: "White" }}>
            <Box sx={{ fontWeight: 900, fontSize: 25 }}>
              <p>Dre*mzy</p>
              <StyledTypo>
                <em>World</em>
              </StyledTypo>
            </Box>
          </a>

          {/* Seach Bar ------------------------------------------------- */}
          <Search />

          {/* Nav Icons ------------------------------------------------- */}
          <NavBarButtons />
        </ResponsiveBar>
      </AppBar>
    </Box>
  );
};

const ResponsiveBar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  "& > a": {
    marginLeft: 10,
    [theme.breakpoints.down("lg")]: {
      marginLeft: 0,
    },
  },
}));

const StyledTypo = styled(Typography)`
  color: yellow;
  variant: subtitle1;
  margin-top: -1em;
  text-align: center;
`
export default NavBar;

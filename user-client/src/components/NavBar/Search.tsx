import * as React from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Box, styled } from "@mui/material";

export const Search: React.FC = () => {
  return (
    <SearchContainer>
      <SearchIcon
        fontSize="large"
        sx={{ color: "rgba(0,0,0,0.3)", padding: "5px 5px 0px 5px" }}
      />
      <InputBase placeholder="Search for Products, Brands and More" fullWidth />
    </SearchContainer>
  );
};

//Styled Components ----------------------------------------------------------------

const SearchContainer = styled(Box)`
  min-width: 50%;
  height: 40px;
  display: flex;
  background: #fff;
  border-radius: 5px;
  margin-left: 40px;
`;

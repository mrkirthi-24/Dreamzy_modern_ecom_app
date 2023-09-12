import * as React from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  ClickAwayListener,
  Divider,
  List,
  ListItem,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { productState } from "../../store/atoms/productState";

export const Search: React.FC = () => {
  const [searchText, setSearchText] = React.useState("");
  const [open, setOpen] = React.useState(true);
  const { products } = useRecoilValue(productState);
  console.log(products);

  const getText = (text: string) => {
    setSearchText(text);
    setOpen(false);
  };

  const handleClickAway = () => setOpen(true);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <SearchContainer>
        <StyledSearchIcon />
        <Divider orientation="vertical" />
        <InputSearchBase
          placeholder="Search for Products, Brands and More"
          value={searchText}
          onChange={(e) => getText(e.target.value)}
        />

        {searchText && (
          <ListWrapper hidden={open}>
            {products
              .filter((product) =>
                product.title.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((product) => (
                <StyledList key={product._id} sx={{ width: "100%" }}>
                  <StyledLink
                    to={`/product/${product._id}`}
                    onClick={() => {
                      setSearchText("");
                      setOpen(true);
                    }}
                  >
                    <StyledSearchIcon />
                    <b>{product.title}</b>
                  </StyledLink>
                </StyledList>
              ))}
          </ListWrapper>
        )}
      </SearchContainer>
    </ClickAwayListener>
  );
};

//Styled Components ----------------------------------------------------------------

const InputSearchBase = styled(InputBase)`
  font-size: unset;
  width: 100%;
  padding-left: 20px;
`;

const SearchContainer = styled(Box)`
  min-width: 50%;
  height: 40px;
  display: flex;
  background: #fff;
  border-radius: 5px;
  margin-left: 40px;
`;

const StyledSearchIcon = styled(SearchIcon)`
  font-size: 35px;
  color: rgba(0, 0, 0, 0.3);
  padding: 5px 5px 0px 5px;
`;

const ListWrapper = styled(List)`
  position: absolute;
  color: #000;
  background: #ffffff;
  margin-top: 36px;
  width: 48.3%;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 0px 0px 5px 5px;
`;

const StyledList = styled(ListItem)`
  padding: 0;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  width: 100%;
`;

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ToggleMode } from "../ToggleMode";
import { styled, alpha } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Divider from "@mui/material/Divider";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";
import { Badge, Button } from "@mui/material";
import LoginDialog from "../LoginDialog";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userFirstNameState } from "../../store/selectors/userFirstName";
import { authTokenState } from "../../store/selectors/authToken";
import LogoutIcon from "@mui/icons-material/Logout";
import { userState } from "../../store/atoms/userState";

interface SignInButtonProps {
  setOpen: (open: boolean) => void;
}

const NavBarButtons: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box display="flex" alignItems="center" ml={5}>
      <SellerButton />
      <SignInButton setOpen={setOpen} />
      <CartButton />
      <ToggleMode />
      <LoginDialog open={open} setOpen={setOpen} />
    </Box>
  );
};

export default NavBarButtons;

const SellerButton: React.FC = () => (
  <StyledLink to={"/sellerportal"}>
    <LocalMallIcon sx={{ mr: 0.5, mt: 0.5 }} />
    <Typography variant="subtitle1" fontWeight={600} fontSize={16} mt={0.7}>
      Become a seller
    </Typography>
  </StyledLink>
);

const SignInButton: React.FC<SignInButtonProps> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const authToken = useRecoilValue(authTokenState);
  const userFirstName = useRecoilValue(userFirstNameState);
  const setUserState = useSetRecoilState(userState);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    props.setOpen(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userToken");
    sessionStorage.removeItem("user");
    setUserState(() => ({
      authToken: "",
      firstName: "",
      userEmail: "",
    }));
    handleClose();
  };

  const handleMenuItemClick = () => {
    if (authToken) {
      handleClose();
    } else {
      handleLogin();
    }
  };

  return (
    <>
      <StyledLink
        to="/login"
        id="demo-customized-button"
        onMouseEnter={handleClick}
      >
        <PersonIcon sx={{ mr: 0.5 }} />
        <Typography variant="subtitle1" fontWeight={600} fontSize={16} mt={0.5}>
          {authToken ? userFirstName : "Sign in"}
        </Typography>
        <KeyboardArrowDownIcon />
      </StyledLink>
      <StyledMenu
        id="demo-customized-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {!authToken && (
          <MenuItem onClick={handleClose} disableRipple>
            <StyledButton onClick={handleLogin}>
              New customer?
              <Typography
                variant="subtitle1"
                fontWeight={900}
                color="blue"
                ml={4}
              >
                Sign Up
              </Typography>
            </StyledButton>
          </MenuItem>
        )}
        {!authToken && <Divider sx={{ my: 0.5 }} />}
        <MenuItem onClick={handleMenuItemClick} disableRipple>
          <PersonIcon />
          My Profile
        </MenuItem>
        <MenuItem onClick={handleMenuItemClick} disableRipple>
          <LocalShippingIcon />
          Orders
        </MenuItem>
        <MenuItem onClick={handleMenuItemClick} disableRipple>
          <FavoriteIcon />
          Wishlist
        </MenuItem>
        <MenuItem onClick={handleMenuItemClick} disableRipple>
          <EmojiEventsIcon />
          Rewards & Gift Cards
        </MenuItem>
        {authToken && <Divider sx={{ my: 0.5 }} />}
        {authToken && (
          <MenuItem onClick={handleLogout} disableRipple>
            <LogoutIcon />
            <Typography
              variant="button"
              color="error"
              fontWeight={600}
              textTransform="none"
            >
              Logout
            </Typography>
          </MenuItem>
        )}
      </StyledMenu>
    </>
  );
};

const CartButton: React.FC = () => (
  <StyledLink to={"/cart"}>
    <Badge badgeContent={4} color="error">
      <ShoppingCartIcon sx={{ marginRight: 0.5 }} />
    </Badge>
    <Typography variant="subtitle1" fontWeight={600} fontSize={16} mt={0.5}>
      Cart
    </Typography>
  </StyledLink>
);

// Styled Components ----------------------------------------------------------------

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  color: white;
  margin-right: 25px;
`;

const StyledButton = styled(Button)`
  display: flex;
  color: black;
  font-size: 16px;
  align-items: center;
  text-transform: none;
`;

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      fontSize: "14px",
      "& .MuiSvgIcon-root": {
        fontSize: 16,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

import { Box, Button, Grid, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { cartState } from "../../store/atoms/cartState";
import { savelaterState } from "../../store/atoms/savelaterState";
import EmptyCart from "./EmptyCart";
import MyCartItems from "./MyCartItems";
import SaveforLater from "./SaveforLater";
import TotalAmountView from "./TotalAmountView";

const Cart = () => {
  const cart = useRecoilValue(cartState);
  const savedLater = useRecoilValue(savelaterState);
  const navigate = useNavigate();

  const handleClick = () => navigate("/confirmorder");

  return (
    <Box bgcolor="#f2f2f2">
      {cart.products.length ||
      (!cart.products.length && savedLater.products.length) ? (
        <Grid container spacing={2} maxWidth="90%" margin="0 auto">
          <Grid item lg={9} md={9} sm={12} xs={12}>
            <MyCartItems cartItems={cart.products} />
            <BottomWrapper>
              <StyledButton
                variant="contained"
                disabled={cart.products.length === 0}
                onClick={handleClick}
              >
                Place Order
              </StyledButton>
            </BottomWrapper>
            <SaveforLater />
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TotalAmountView cartItems={cart.products} />
          </Grid>
        </Grid>
      ) : (
        <EmptyCart />
      )}
    </Box>
  );
};

//Styled Components

const BottomWrapper = styled(Box)`
  display: flex;
  justify-content: flex-end;
  padding: 16px 22px;
  margin-bottom: 10px;
  background: #fff;
  box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
  border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
  background: #fb641b;
  color: #fff;
  font-weight: bold;
  border-radius: 2px;
  width: 250px;
  height: 51px;
`;

export default Cart;

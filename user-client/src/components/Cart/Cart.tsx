import { Box, Grid } from "@mui/material";
import { useRecoilValue } from "recoil";
import { cartState } from "../../store/atoms/cartState";
import EmptyCart from "./EmptyCart";
import MyCartItems from "./MyCartItems";
import TotalAmountView from "./TotalAmountView";

const Cart = () => {
  const cart = useRecoilValue(cartState);

  return (
    <Box bgcolor="#f2f2f2">
      {cart.products.length ? (
        <Grid container spacing={2} maxWidth="90%" margin="0 auto">
          <Grid item lg={9} md={9} sm={12} xs={12}>
            <MyCartItems cartItems={cart.products} />
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

export default Cart;

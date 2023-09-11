import { Box, Button, CircularProgress, styled } from "@mui/material";
import { ShoppingCart as Cart, FlashOn as Flash } from "@mui/icons-material";
import { Product } from "../../store/atoms/productState";
import { useRecoilState } from "recoil";
import { cartState } from "../../store/atoms/cartState";

interface ItemActionsProps {
  loading: boolean;
  item: Product | null;
}

const ItemActions: React.FC<ItemActionsProps> = ({ item, loading }) => {
  const [cart, setCart] = useRecoilState(cartState);

  const handleAddCart = async () => {
    try {
      const existingProduct = cart.products.find(
        (product) => product?._id === item?._id
      );

      if (!existingProduct) {
        if (item != null) {
          const updatedCart = [...cart.products, item];
          setCart(() => ({
            products: updatedCart,
          }));
          // Store the updated cart in sessionStorage
          sessionStorage.setItem("cart", JSON.stringify(updatedCart));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LeftContainer>
      {loading ? <CircularProgress /> : <Image src={item?.imageUrl} />}
      <br />
      <StyledButton
        style={{ marginRight: 10, background: "#ff9f00" }}
        variant="contained"
        onClick={handleAddCart}
      >
        <Cart />
        Add to Cart
      </StyledButton>
      <StyledButton style={{ background: "#fb641b" }} variant="contained">
        <Flash /> Buy Now
      </StyledButton>
    </LeftContainer>
  );
};

//Styled Components ----------------------------------------------------------------

const LeftContainer = styled(Box)(({ theme }) => ({
  minWidth: "40%",
  padding: "40px 0 0 80px",
  [theme.breakpoints.down("md")]: {
    padding: "20px 40px",
  },
}));

const Image = styled("img")({
  padding: "15px 20px",
  border: "1px solid #f0f0f0",
  width: "95%",
  marginBottom: "10px",
});

const StyledButton = styled(Button)`
  width: 46%;
  border-radius: 2px;
  height: 50px;
  color: #fff;
`;

export default ItemActions;

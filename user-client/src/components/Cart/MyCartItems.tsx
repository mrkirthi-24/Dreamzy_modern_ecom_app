import { Box, Card, Divider, styled, Typography } from "@mui/material";
import { useRecoilState, useSetRecoilState } from "recoil";
import { cartState } from "../../store/atoms/cartState";
import { Product } from "../../store/atoms/productState";
import InfoIcon from "@mui/icons-material/Info";
import GroupButtons from "./GroupButtons";
import { savelaterState } from "../../store/atoms/savelaterState";

interface MyCartItemsProps {
  cartItems: Product[];
}

const MyCartItems: React.FC<MyCartItemsProps> = ({ cartItems }) => {
  const setCartState = useSetRecoilState(cartState);
  const [savedLater, setSavedLater] = useRecoilState(savelaterState);

  const handleRemoveItem = (removeItemId: string) => {
    const updatedCart = cartItems.filter((item) => item._id !== removeItemId);
    setCartState({ products: updatedCart });
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleSave = (saveItemId: string) => {
    const existing = savedLater.products.find(
      (product) => product._id === saveItemId
    );
    if (!existing) {
      const saveProduct = cartItems.filter((item) => item._id === saveItemId);
      const updateItems = [...savedLater.products, saveProduct[0]];
      setSavedLater({ products: updateItems });
      sessionStorage.setItem("saved", JSON.stringify(updateItems));
      handleRemoveItem(saveItemId);
    }
  };

  return (
    <Box bgcolor="#fff" mb={1}>
      <Typography fontSize="16px" fontWeight={900} padding={2}>
        MY CART ({cartItems.length} items)
      </Typography>

      {cartItems.length ? (
        cartItems.map((item) => (
          <Component key={item._id}>
            <LeftComponent>
              <img src={item.imageUrl} style={{ height: 135, width: 120 }} />
              <GroupButtons />
            </LeftComponent>
            <Box
              p="0 0 0 30px"
              width="100%"
              display="flex"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h5">{item.title}</Typography>
                <SmallText>{item.description}</SmallText>
                <SmallText>Seller: Nexus Exports</SmallText>
                <Box mt={2} display="flex" alignItems="baseline">
                  <MRP>₹{item.mrp}</MRP>
                  <SellPrice>₹{item.sell}</SellPrice>
                  <Discount>
                    {Math.round(((item.mrp - item.sell) / item.mrp) * 100)}% OFF
                  </Discount>
                  <Discount>
                    4 offers applied &nbsp;
                    <InfoIcon fontSize="inherit" />
                  </Discount>
                </Box>
                <Box display="flex" alignItems="end" height="11vh">
                  <ActionButton onClick={() => handleSave(item._id)}>
                    Save for later
                  </ActionButton>
                  <ActionButton onClick={() => handleRemoveItem(item._id)}>
                    Remove
                  </ActionButton>
                </Box>
              </Box>
              <SmallText>Delivery in 2 days</SmallText>
            </Box>
          </Component>
        ))
      ) : (
        <Box textAlign="center" color="grey">
          <Divider />
          <Typography variant="body1" p={2}>
            No items in the cart
          </Typography>
        </Box>
      )}
    </Box>
  );
};

//Styled Component ----------------------------------------------------------------

const Component = styled(Card)`
  border-top: 1px solid #f0f0f0;
  border-radius: 0px;
  display: flex;
  padding: 20px;
`;

const LeftComponent = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const SmallText = styled(Typography)`
  color: #878787;
  font-size: 14px;
`;

const MRP = styled(Typography)`
  color: #878787;
  text-decoration: line-through;
  margin-right: 10px;
`;

const SellPrice = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
  margin-right: 10px;
`;

const Discount = styled(Typography)`
  color: #388e3c;
  margin-right: 10px;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
`;

const ActionButton = styled(Typography)`
  color: grey;
  padding: 10px 5px;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 600;
  margin-right: 10px;
  border: 1px solid #f0f0f0;
  cursor: pointer;
`;

export default MyCartItems;

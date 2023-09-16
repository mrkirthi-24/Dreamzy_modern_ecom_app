import { Box, Button, Card, Divider, styled, Typography } from "@mui/material";
import { useRecoilState } from "recoil";
import { cartState } from "../../store/atoms/cartState";
import { savelaterState } from "../../store/atoms/savelaterState";

const SaveforLater: React.FC = () => {
  const [cart, setCartState] = useRecoilState(cartState);
  const [savedLater, setSavedLater] = useRecoilState(savelaterState);
  const { products } = savedLater;

  const handleClick = (ItemId: string) => {
    const moveToCart = products.find((product) => product._id === ItemId);
    const updateSaved = products.filter((item) => item._id !== ItemId);
    setSavedLater({ products: updateSaved });
    if (moveToCart != undefined)
      setCartState({ products: [...cart.products, moveToCart] });
    sessionStorage.setItem(
      "cart",
      JSON.stringify([...cart.products, moveToCart])
    );
    sessionStorage.setItem("saved", JSON.stringify(updateSaved));
  };

  return (
    <Box bgcolor="#fff" mb={5}>
      <Typography fontSize="16px" fontWeight={900} padding={2}>
        SAVE FOR LATER
      </Typography>
      <Divider />

      {products.length ? (
        products.map((item) => (
          <Component key={item._id}>
            <img src={item.imageUrl} style={{ height: 55, width: 50 }} />
            <Box
              p="0 0 0 30px"
              width="100%"
              display="flex"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h6">{item.title}</Typography>
                <SmallText>{item.description}</SmallText>
              </Box>
              <Button
                sx={{ border: "1px solid grey" }}
                onClick={() => handleClick(item._id)}
              >
                MOVE TO CART
              </Button>
            </Box>
          </Component>
        ))
      ) : (
        <Box textAlign="center" color="grey">
          <Typography variant="body1" p={2}>
            No items saved for later
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

const SmallText = styled(Typography)`
  color: #878787;
  font-size: 14px;
`;

export default SaveforLater;

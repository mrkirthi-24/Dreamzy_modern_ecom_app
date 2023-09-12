import { styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Product } from "../../store/atoms/productState";

interface TotalAmountViewProps {
  cartItems: Product[];
}

const TotalAmountView: React.FC<TotalAmountViewProps> = ({ cartItems }) => {
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    totalAmount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  const totalAmount = () => {
    let price = 0,
      discount = 0;
    cartItems.map((item) => {
      price += item.mrp;
      discount += item.mrp - item.sell;
    });
    setPrice(price);
    setDiscount(discount);
  };

  return (
    <Box mb={5}>
      <Header>
        <Heading>PRICE DETAILS</Heading>
      </Header>
      <Container>
        <Typography>
          Price ({cartItems?.length} items)
          <Price>₹{price}</Price>
        </Typography>
        <Typography>
          Discount
          <Price>₹{discount}</Price>
        </Typography>
        <Typography>
          Delivery Charges
          <Price>₹40</Price>
        </Typography>
        <TotalAmount>
          Total Amount
          <Price>₹{price - discount}</Price>
        </TotalAmount>
        <Discount>You will save ₹{discount - 40} on this order</Discount>
      </Container>
    </Box>
  );
};

//Styled Components ----------------------------------------------------------------

const Header = styled(Box)`
  padding: 15px 24px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
`;

const Heading = styled(Typography)`
  color: #878787;
  font-size: 14px;
  font-weight: 900;
`;

const Container = styled(Box)`
  padding: 15px 24px;
  background: #fff;
  & > p {
    margin-bottom: 15px;
  }
`;

const Price = styled("span")`
  float: right;
`;

const TotalAmount = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  border-top: 1px solid #e0e0e0;
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;
`;

const Discount = styled(Typography)`
  font-size: 18px;
  color: green;
`;

export default TotalAmountView;

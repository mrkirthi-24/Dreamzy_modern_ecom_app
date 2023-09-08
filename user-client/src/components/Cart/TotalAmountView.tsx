import { styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Product } from "../../store/atoms/productState";

interface TotalAmountViewProps {
  cartItems: Product[];
}

const TotalAmountView: React.FC<TotalAmountViewProps> = ({ cartItems }) => {
  return (
    <Box>
      <Header>
        <Heading>PRICE DETAILS</Heading>
      </Header>
      <Container>
        <Typography>
          Price ({cartItems?.length} items)
          <Price>₹6000</Price>
        </Typography>
        <Typography>
          Discount
          <Price>-₹3000</Price>
        </Typography>
        <Typography>
          Delivery Charges
          <Price>₹40</Price>
        </Typography>
        <TotalAmount>
          Total Amount
          <Price>₹3000</Price>
        </TotalAmount>
        <Discount>You will save ₹3000 on this order</Discount>
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
    margin-bottom: 20px;
    font-size: 14px;
  }
`;

const Price = styled("span")`
  float: right;
`;

const TotalAmount = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
  border-top: 1px solid #e0e0e0;
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;
`;

const Discount = styled(Typography)`
  font-size: 16px;
  color: green;
`;

export default TotalAmountView;

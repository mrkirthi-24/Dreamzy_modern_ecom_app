import { Typography, Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

const Component = styled(Box)`
  width: 100%;
  height: 65vh;
  background: #fff;
`;

const Container = styled(Box)`
  text-align: center;
  padding-top: 70px;
`;

const Image = styled("img")({
  width: "15%",
});

const EmptyCart = () => {
  const imgurl =
    "https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90";

  return (
    <Component>
      <Container>
        <Image src={imgurl} />
        <Typography>Your cart is empty!</Typography>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography component="span">Continue Shopping</Typography>
        </Link>
      </Container>
    </Component>
  );
};

export default EmptyCart;

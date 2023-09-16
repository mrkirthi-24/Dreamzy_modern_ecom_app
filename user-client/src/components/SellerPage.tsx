import { Box, Typography } from "@mui/material";

const SellerPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      height="100vh"
    >
      <Typography
        variant="h3"
        textAlign="center"
        fontWeight={900}
        display="flex"
        alignItems="center"
        justifyContent="center"
        mt={3}
        mb={7}
      >
        Sell Online with Us &nbsp;
        <img
          src="https://static-assets-web.flixcart.com/fk-sp-static/images/prelogin/images/group_1000001236.webp"
          alt=""
          height={100}
          width={100}
        />
      </Typography>
    </Box>
  );
};

export default SellerPage;

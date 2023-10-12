import { Box, Typography } from "@mui/material";

const SellerPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      height="100vh"
      mt={-11}
      mb={15}
    >
      <Typography
        variant="h3"
        textAlign="center"
        fontWeight={900}
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb={2}
      >
        Sell Online with Us &nbsp;
        <img
          src="https://static-assets-web.flixcart.com/fk-sp-static/images/prelogin/images/group_1000001236.webp"
          alt=""
          height={100}
          width={100}
        />  
      </Typography>
      <Typography
       variant="h3"
       textAlign="center"
       fontWeight={600}
       >
        <a href="https://modern-ecomm-app.vercel.app/"><u>Click here</u></a> &nbsp;to go to seller portal</Typography>
    </Box>
  );
};

export default SellerPage;

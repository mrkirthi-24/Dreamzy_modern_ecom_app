import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirecttimer = setTimeout(() => {
      navigate("/");
    }, 3000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(redirecttimer);
  }, [navigate]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      height="90vh"
    >
      <Typography
        variant="h3"
        textAlign="center"
        fontWeight={900}
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb={3}
      >
        Congratulations 😊
      </Typography>
      <Typography variant="body1" textAlign="center" color="grey">
        We have successfully recieved your order
        <br />
        You will be redirected to the Home page in 3 seconds
      </Typography>
    </Box>
  );
};

export default ConfirmOrder;

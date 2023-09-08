//backgroundColor: '#',

import { Box, Link, Stack, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box bgcolor="#232f3e" pb={1} color="white">
      <Link href="#" underline="none" color="white">
        <Box bgcolor="#3f546f" textAlign="center" padding="18px 0">
          <Typography variant="subtitle1" fontWeight={600}>
            Back to top
          </Typography>
        </Box>
      </Link>
      <Stack
        spacing={20}
        padding={2}
        direction="row"
        display="flex"
        justifyContent="center"
        mb={4}
      >
        <Box>
          <Typography variant="h6" fontWeight={600} marginBottom={1}>
            Get to know us
          </Typography>
          <Typography variant="subtitle2">About Us</Typography>
          <Typography variant="subtitle2">Careers</Typography>
          <Typography variant="subtitle2">Press Release</Typography>
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={600} marginBottom={1}>
            Connect with us
          </Typography>
          <Typography variant="subtitle2">Facebook</Typography>
          <Typography variant="subtitle2">Instagram</Typography>
          <Typography variant="subtitle2">WhatsApp</Typography>
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={600} marginBottom={1}>
            Make Money with Us
          </Typography>
          <Typography variant="subtitle2">Sell on Amazon</Typography>
          <Typography variant="subtitle2">
            Sell under Amazon Accelerator
          </Typography>
          <Typography variant="subtitle2">
            Protect and Build Your Brand
          </Typography>
          <Typography variant="subtitle2">Become an Affiliate</Typography>
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={600} marginBottom={1}>
            Let us Help you
          </Typography>
          <Typography variant="subtitle2">Your Account</Typography>
          <Typography variant="subtitle2">Return Centre</Typography>
          <Typography variant="subtitle2">100% Purchase Protection</Typography>
          <Typography variant="subtitle2">24/7 Customer Service</Typography>
        </Box>
      </Stack>
      <Typography variant="subtitle2" textAlign="center" color="grey">
        © {new Date().getFullYear()} finity World. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;

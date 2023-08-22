import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";

const Home = () => {
  return (
    <Container
      sx={{
        width: "100vw",
        height: "90vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding="100px"
      >
        <Typography variant="h4">
          Welcome to the world's best ecommerce platform
        </Typography>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              height="100%"
              image="https://www.searchenginejournal.com/wp-content/uploads/2020/12/ecommerce-mcommerce-featured-image-5fd09a3a5ff2a.png"
              alt="ecommerce"
            />
          </CardActionArea>
          {/* <img
            src=""
            alt="ecommerce"
            width="100%"
            height="100%"
          /> */}
        </Card>
      </Box>
    </Container>
  );
};

export default Home;

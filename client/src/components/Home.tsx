import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");

  return (
    <Container sx={ContainerStyles}>
      <Grid container spacing={2} mt={8}>
        <Grid item xs={4}>
          <Paper elevation={10} sx={HeadingStyles}>
            <Typography variant="h4" fontWeight={600} fontSize={50}>
              Welcome to world's best ecommerce platform
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <img
            src="https://www.searchenginejournal.com/wp-content/uploads/2020/12/ecommerce-mcommerce-featured-image-5fd09a3a5ff2a.png"
            alt=""
            width="100%"
            height="100%"
          />
        </Grid>
        {authToken && (
          <>
            <Grid item xs={4}>
              <Paper
                elevation={8}
                sx={{ padding: "50px 100px", position: "relative" }}
                onClick={() => {
                  navigate("/products");
                }}
              >
                <Button sx={ButtonStyles}>Go to Products page</Button>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper
                elevation={8}
                sx={{ padding: "50px 100px", position: "relative" }}
                onClick={() => {
                  navigate("/home");
                }}
              >
                <Button sx={ButtonStyles}>Go to Home page</Button>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper
                elevation={8}
                sx={{ padding: "50px 100px", position: "relative" }}
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <Button sx={ButtonStyles}>Go to Admin profile</Button>
              </Paper>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

//Component styles

const ContainerStyles = {
  width: "100vw",
  height: "90vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const HeadingStyles = {
  width: "100%",
  height: "100%",
  display: "flex",
  textAlign: "center",
  alignItems: "center",
  padding: "10px",
};

const ButtonStyles = {
  position: "absolute",
  right: 0,
  bottom: 0,
  fontSize: 11,
};

export default Home;

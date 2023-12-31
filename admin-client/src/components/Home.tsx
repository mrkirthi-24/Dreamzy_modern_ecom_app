import {
  Button,
  Container,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../store/selectors/authToken";

const Home = () => {
  const navigate = useNavigate();
  const authToken = useRecoilValue(authTokenState);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Container sx={ContainerStyles}>
      <Grid container spacing={2} mt={8}>
        <Grid item xs={4}>
          <Paper elevation={10} sx={HeadingStyles}>
            <Typography variant="h4" fontWeight={600} fontSize={50}>
              Welcome to world's largest ecommerce platform
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          {!imageLoaded && (
            <Skeleton variant="rectangular" width="100%" height="100%" />
          )}
          <img
            src="https://www.searchenginejournal.com/wp-content/uploads/2020/12/ecommerce-mcommerce-featured-image-5fd09a3a5ff2a.png"
            alt=""
            width="100%"
            height="100%"
            onLoad={() => {
              setImageLoaded(true);
            }}
            style={{ display: imageLoaded ? "block" : "none" }}
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
                  navigate("/orders");
                }}
              >
                <Button sx={ButtonStyles}>View Orders</Button>
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
                <Button sx={ButtonStyles}>Update Admin profile</Button>
              </Paper>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

//Component styles ----------------------------------------------------------------

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

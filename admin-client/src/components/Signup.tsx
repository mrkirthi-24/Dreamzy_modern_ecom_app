import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useThemeContext } from "../theme/ThemeContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { adminState } from "../store/atoms/admin";
import { CopyrightProps } from "./types";
// import { z } from "zod";

const Copyright: React.FC<CopyrightProps> = (props) => {
  return (
    <Typography variant="body2" color="textSecondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="/">
        Modern Ecommerce App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default function SignUp() {
  const { mode } = useThemeContext();

  const [checked, setChecked] = React.useState(true);
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const setAdminState = useSetRecoilState(adminState);
  const navigate = useNavigate();

  // //Zod
  // const signUpParams = z.object({
  //   firstname: z.string().min(2).max(25).nonempty(),
  //   lastname: z.string().min(2).max(25).nonempty(),
  //   username: z.string().email(),
  //   password: z.string().min(6),
  // });

  // type Admin = z.infer<typeof signUpParams>;

  // const signupInput: Admin = {
  //   firstname: firstname,
  //   lastname: lastname,
  //   username: email,
  //   password: password,
  // };

  //Submit the form
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const fetchData = async () => {
      try {
        await axios
          .post("http://localhost:3000/admin/signup", {
            fullname: firstname + " " + lastname,
            username: email,
            password: password,
            // signupInput,
          })
          .then((response) => {
            const data = response.data;
            if (data.token) {
              sessionStorage.setItem("token", data.token);
              sessionStorage.setItem("admin", email);
              setAdminState((prevState) => ({
                ...prevState,
                authToken: data.token,
                adminEmail: email,
              }));
            }
          })
          .catch((error) => {
            throw error;
          });
        navigate("/");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: mode === "light" ? "black" : "white" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="acceptT&C"
                    color="primary"
                    onChange={() => setChecked(!checked)}
                  />
                }
                label="I accept T&C and also accept to recieve important information from the organisation."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={checked}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}

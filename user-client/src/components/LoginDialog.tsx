import { useState, ChangeEvent } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  TextField,
  Box,
  Button,
  Typography,
  styled,
} from "@mui/material";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/userState";
import axios from "axios";

const loginInitialValues = {
  username: "",
  password: "",
};

const signupInitialValues = {
  firstname: "",
  lastname: "",
  phone: "",
  username: "",
  password: "",
};

const accountInitialValues = {
  login: {
    view: "login",
    heading: "Login",
    subHeading: "Get access to your Orders, Wishlist and Recommendations",
  },
  signup: {
    view: "signup",
    heading: "Looks like you're new here",
    subHeading: "Signup to get started",
  },
};

interface LoginDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

// Validation schema for login form
const loginSchema = z.object({
  username: z.string().email().min(5),
  password: z.string().min(6),
});

// Validation schema for signup form
// const signupSchema = z.object({
//   firstname: z.string().min(2),
//   lastname: z.string().min(2),
//   phone: z.string().min(10),
//   username: z.string().email().min(5),
//   password: z.string().min(6),
// });

const LoginDialog: React.FC<LoginDialogProps> = ({ open, setOpen }) => {
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
  const [account, toggleAccount] = useState(accountInitialValues.login);
  const setUser = useSetRecoilState(userState);

  const onValueChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const toggleSignup = () => {
    toggleAccount(accountInitialValues.signup);
  };

  const handleClose = () => {
    setOpen(false);
    toggleAccount(accountInitialValues.login);
  };

  const handleLogin = () => {
    const loginUser = async () => {
      try {
        const loginData = loginSchema.safeParse(login);
        if (loginData.success === true) {
          const response = await axios.post(
            "http://localhost:3000/user/login",
            {
              ...loginData,
            }
          );

          const data = response.data;
          if (data.token) {
            sessionStorage.setItem("userToken", data.token);
            sessionStorage.setItem("user", data.firstname);
            setUser(() => ({
              authToken: data.token,
              userEmail: login.username,
              firstName: data.firstname,
            }));
            handleClose();
          }
        } else {
          console.error("Validation error");
        }
      } catch (error) {
        console.error("Error login user:", error);
      }
    };
    loginUser();
  };

  const handleSignup = () => {
    const signupUser = async () => {
      try {
        await axios
          .post("http://localhost:3000/user/signup", {
            fullname: signup.firstname + " " + signup.lastname,
            ...signup,
          })
          .then((response) => {
            const data = response.data;
            if (data.token) {
              sessionStorage.setItem("userToken", data.token);
              sessionStorage.setItem("user", signup.firstname);
              setUser(() => ({
                authToken: data.token,
                firstName: signup.firstname,
                userEmail: signup.username,
              }));
              handleClose();
            }
          });
      } catch (error) {
        console.error("Error registering user:", error);
      }
    };
    signupUser();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { maxWidth: "unset" } }}
    >
      <Component>
        <Box style={{ display: "flex", height: "100%" }}>
          <Image>
            <Typography variant="h5">{account.heading}</Typography>
            <Typography style={{ marginTop: 20 }}>
              {account.subHeading}
            </Typography>
          </Image>
          {account.view === "login" ? (
            <Wrapper>
              <TextField
                variant="standard"
                onChange={(e) => onValueChange(e)}
                name="username"
                label="Enter Email/Mobile number"
                // error={!!error && error.field === "username"}
                // helperText={
                //   !!error && error.field === "username" && error.message
                // }
                autoFocus
              />
              <TextField
                type="password"
                variant="standard"
                onChange={(e) => onValueChange(e)}
                name="password"
                label="Enter Password"
              />
              <Text>
                By continuing, you agree to Flipkart's Terms of Use and Privacy
                Policy.
              </Text>
              <LoginButton onClick={handleLogin}>Login</LoginButton>
              <Text style={{ textAlign: "center" }}>OR</Text>
              <RequestOTP>Request OTP</RequestOTP>
              <CreateAccount onClick={() => toggleSignup()}>
                New to Flipkart? Create an account
              </CreateAccount>
            </Wrapper>
          ) : (
            <Wrapper>
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="firstname"
                label="Enter Firstname"
                autoFocus
              />
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="lastname"
                label="Enter Lastname"
              />
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="phone"
                label="Enter Phone"
              />
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="username"
                label="Enter Email"
              />
              <TextField
                type="password"
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="password"
                label="Enter Password"
              />
              <LoginButton onClick={handleSignup}>Continue</LoginButton>
            </Wrapper>
          )}
        </Box>
      </Component>
    </Dialog>
  );
};

export default LoginDialog;

//Styled Components ----------------------------------------------------------------

const Component = styled(DialogContent)`
  height: 70vh;
  width: 90vh;
  padding: 0;
  padding-top: 0;
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
  &:hover {
    background: #fb641b;
  },
`;

const RequestOTP = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const CreateAccount = styled(Typography)`
  margin: auto 0 5px 0;
  text-align: center;
  color: #2874f0;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
`;

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const Image = styled(Box)`
  background: #2874f0
    url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png)
    center 85% no-repeat;
  width: 40%;
  height: 100%;
  padding: 45px 35px;
  & > p,
  & > h5 {
    color: #ffffff;
    font-weight: 600;
  }
`;

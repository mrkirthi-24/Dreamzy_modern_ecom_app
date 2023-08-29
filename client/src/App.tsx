import { ThemeProvider, CssBaseline } from "@mui/material";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Alert from "./components/Alert";
import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Products from "./components/Products";
import Signup from "./components/Signup";
import { adminState } from "./store/atoms/admin";
import { useThemeContext } from "./theme/ThemeContextProvider";

const App = (): JSX.Element => {
  const { theme } = useThemeContext();
  const setAdminEmail = useSetRecoilState(adminState);
  //set admin email for app

  useEffect(() => {
    const authToken = sessionStorage.getItem("token");
    const adminEmail = sessionStorage.getItem("admin");
    const validAdminEmail = adminEmail || "";

    setAdminEmail((prevState) => ({
      ...prevState,
      authToken,
      adminEmail: validAdminEmail,
    }));
  }, [setAdminEmail]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/products" element={<Products />} />
            <Route path="*" element={"Error 404: Path Not Found"} />
          </Routes>
          <Alert />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;

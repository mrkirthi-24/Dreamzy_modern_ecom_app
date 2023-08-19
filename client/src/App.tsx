import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Products from "./components/Products";
import Signup from "./components/Signup";
import { useThemeContext } from "./theme/ThemeContextProvider";

const App = (): JSX.Element => {
  const { theme } = useThemeContext();
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
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;

import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Footer";
import Home from "./components/Home/Home";
import Navbar from "./components/NavBar/Navbar";
import ProductDetails from "./components/Products/ProductDetails";
import Products from "./components/Products/Products";
import SellerPage from "./components/SellerPage";
import { cartState } from "./store/atoms/cartState";
import { userState } from "./store/atoms/userState";

const App: React.FC = () => {
  const setUserState = useSetRecoilState(userState);
  const setCartState = useSetRecoilState(cartState);

  React.useEffect(() => {
    const authToken = sessionStorage.getItem("userToken");
    const firstName = sessionStorage.getItem("user");
    const updateCart = sessionStorage.getItem("cart");
    const validfirstName = firstName || "";

    setUserState((prevState) => ({
      ...prevState,
      authToken,
      firstName: validfirstName,
    }));

    if (updateCart !== null) {
      setCartState(() => ({
        products: JSON.parse(updateCart),
      }));
    }
  }, [setUserState, setCartState]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/sellerportal" element={<SellerPage />} />
          <Route path="*" element={"Error 404: Path Not Found"} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;

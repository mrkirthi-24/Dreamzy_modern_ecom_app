import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./components/Home/Home";
import Navbar from "./components/NavBar/Navbar";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={"Error 404: Path Not Found"} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;

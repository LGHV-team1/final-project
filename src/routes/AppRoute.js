import React from "react";
import { BrowserRouter,Route, Routes } from "react-router-dom";
import Header from "../components/header";
import Home from "../page/Home";
import Login from "../page/login";
import Register from "../page/register";
import Mypage from "../page/Mypage";
import Footer from "../components/footer";
function AppRoute() {
  return (
    <BrowserRouter>
      <Header />
      <div style={style}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

const style = {
  padding: "30px",
  width: "100%",
  minHeight: "70vh",
};

export default AppRoute;

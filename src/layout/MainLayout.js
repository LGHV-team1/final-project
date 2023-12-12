import React from "react";
import Header2 from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
function MainLayout() {
  return (
    <>
      <Header2 />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;

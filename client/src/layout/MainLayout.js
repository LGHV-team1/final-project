import React from "react";
import { useLocation } from "react-router-dom";
import Header2 from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const location = useLocation();
  
  // '/search' 경로일 때만 특정 키 값을 설정
  const headerKey = location.pathname === "/search" ? "search" : "not-search";

  return (
    <>
      <Header2 key={headerKey} />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;

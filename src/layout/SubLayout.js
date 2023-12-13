import React from "react";
import Header2 from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Header from "./BeforeHeader";

export default function SubLayout() {
  return (
    <>
      {" "}
      {/* 전체 컨테이너에 relative 적용 */}
      {/* BeforeHeader에 absolute 적용 */}
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

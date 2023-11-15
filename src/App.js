import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Header2 from "./components/header/Header.js";
import Footer from "./components/footer/Footer.js";
import Login from "./page/login.js";
import Register from "./page/register.js";
import React from "react";
import Mypage from "./page/myPage.js";
import Home from "./page/home.js";
import Main from "./page/main.js";
import Detail from "./page/detail.js";
// import AppRoute from "./routes/AppRoute.js";
// function App() {
//   return (
//     <AppRoute />

function App() {
  return (
    <Router>
      <Header2 />
      <div style={style}>
        <Routes>
          <Route path="/"element={<><Home/></>}/>
          <Route path="/login"element={<><Login /></>}/>
          <Route path="/register" element={<><Register /></>}/>
          <Route path="/main" element={<><Main /></>} />
          <Route path="/detail" element={<><Detail/></>} />
          <Route path="/mypage" element={<><Mypage /></>} />
        </Routes>
      </div>
      <Footer />
    </Router>

  );
}
const style ={
  minHeight:'100vh',
}
export default App;

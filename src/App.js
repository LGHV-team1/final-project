import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Header2 from "./components/header/Header.js";
import Footer from "./components/footer/Footer.js";
import Login from "./page/Login.js";
import Register from "./page/Register.js";
import React from "react";
import Mypage from "./page/Mypage.js";
import Home from "./page/Home.js";
import Main from "./page/Main.js";
import Detail from "./page/Detail.js";
import Socialkakao from "./Socialkakao.js";
import Socialnaver from "./Socialnaver.js";
import Socialgoogle from "./Socialgoogle.js";
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
          <Route path="/socialk" element={<><Socialkakao /></>} />
          <Route path="/socialn" element={<><Socialnaver /></>} />
          <Route path="/socialg" element={<><Socialgoogle /></>} />
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

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./page/Login.js";
import Register from "./page/Register.js";
import React from "react";
import Mypage from "./page/Mypage.js";
import Footer from "./components/Footer.js";
import Home from "./page/Home.js";
import Header2 from "./components/Header2.js";
import Main from "./page/Main.js";
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
          <Route path="/detail:" element={<><Home /></>} />
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

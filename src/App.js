import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./page/login.js";
import Register from "./page/register.js";
import Redirection from "./page/redirection";
import React from "react";
import Header from "./components/header.js";
import Footer from "./components/footer.js";
<<<<<<< HEAD
import Home from "./page/Home.js";
import Header2 from "./components/header2.js";
import AppRoute from "./routes/AppRoute.js";
function App() {
  return (
    <AppRoute />
=======
import Main from "./page/Main.js";
import Home from "./page/Home.js"
function App() {
  return (
    <Router>
      <Header />
      <div style={style}>
        <Routes>
          <Route path="/"element={<><Home/></>}/>
          <Route path="/login"element={<><Login /></>}/>
          <Route path="/register" element={<><Register /></>}/>
          <Route path="/main" element={<><Main /></>} />
          <Route path="/detail:" element={<><Home /></>} />
          <Route path="/mypage" element={<><Home /></>} />
        </Routes>
      </div>
      <Footer />
    </Router>
>>>>>>> 6a063193df84a5a04ebeac0d360dea3e47dbf239
  );
}
const style ={
  minHeight:'100vh',
}
export default App;

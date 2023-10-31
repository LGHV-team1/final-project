import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./components/login.js";
import Register from "./components/register";
import Redirection from "./components/redirection";
import React from "react";
import Kakao_Login from "./components/KakaoLogin";


function App() {
  return (
    <Router>
      <Routes>
          <Route path="/login" element={<><Login /></>} />
          <Route path="/register" element={<><Register /></>} />
          <Route exact path='/auth' element={<Kakao_Login />} />
        </Routes>

    </Router>
    
  );
}

export default App;

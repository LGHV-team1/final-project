import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./page/login.js";
import Register from "./page/register.js";
import Redirection from "./page/redirection";
import React from "react";
import Header from "./components/header.js";
import Footer from "./components/footer.js";
import Home from "./page/Home.js";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Register />
            </>
          }
        />
        <Route path="/home" element={<><Home /></>} />
        <Route path="/detail:" element={<><Home /></>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

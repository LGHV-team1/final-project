import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./page/login.js";
import Register from "./page/register.js";
import Redirection from "./page/redirection";
import React from "react";
import Header from "./components/header.js";
import Footer from "./components/footer.js";

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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

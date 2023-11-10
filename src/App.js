import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./page/login.js";
import Register from "./page/register.js";
import Redirection from "./page/redirection";
import React from "react";
import Header from "./components/header.js";
import Footer from "./components/footer.js";
import Home from "./page/Home.js";
import Header2 from "./components/header2.js";
import AppRoute from "./routes/AppRoute.js";
function App() {
  return (
    <AppRoute />
  );
}

export default App;

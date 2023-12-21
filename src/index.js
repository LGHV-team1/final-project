import React from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store/store.js";
import ScrollToTop from "./components/ScrollonTop.js";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App />
        </ScrollToTop>
    </BrowserRouter>
  </Provider>
);

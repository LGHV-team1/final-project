import React from 'react';
import axios from "axios";
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux"; 
import App from './App';
import {store} from "./redux/store/store.js"
const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
root.render(
  
    <Provider store={store}>
      <App />
    </Provider>
    
);


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./page/Login.js";
import Register from "./page/Register.js";
import React from "react";
import Mypage from "./page/Mypage.js";
import First from "./page/First.js";
import Home from "./page/Home.js";
import Detail from "./page/Detail.js";
import Socialkakao from "./page/tmp/Socialkakao.js";
import Socialnaver from "./page/tmp/Socialnaver.js";
import Socialgoogle from "./page/tmp/Socialgoogle.js";
import Movie from "./page/Movie.js";
import Tv from "./page/Tv.js";
import Kids from "./page/Kids.js";
import About from "./page/About.js";
import PrivateRouter from "./PrivateRouter.js";
import LoginRouter from "./LoginRouter.js";
import MainLayout from "./layout/MainLayout.js";
import SubLayout from "./layout/SubLayout.js";
import Search from "./page/Search.js";
import SelectCategory from "./page/SelectCategory.js";
import SelectContents from "./page/SelectContents.js";
import ShortFilm2 from "./page/ShortFilm2.js";

function App() {
  return (
  
      <div style={style}>
      <Routes>
      <Route path="/about" element={<><About /></>} />
        <Route element={<PrivateRouter/>}>
          <Route element={<MainLayout />}>
            <Route path="/Home" element={<><Home /></>} />
            <Route path="/movie" element={<><Movie /></>} />
            <Route path="/tv" element={<><Tv /></>} />
            <Route path="/kids" element={<><Kids /></>} />
            <Route path="/detail/:name" element={<><Detail/></>} />
            <Route path="/mypage" element={<><Mypage /></>} />
            <Route path="/search" element={<><Search /></>} />
            <Route path="/selectcategory" element={<><SelectCategory /></>} />
            <Route path="/selectcontents" element={<><SelectContents /></>} />
            <Route path="/shortfilm" element={<><ShortFilm2 /></>} />
          </Route>
        </Route>
        <Route element={<SubLayout/>}>
          <Route element={<LoginRouter/>}>
            <Route path="/"element={<><First/></>}/>
          </Route>
          <Route path="/login"element={<><Login /></>}/>
          <Route path="/register" element={<><Register /></>}/>
          <Route path="/socialk" element={<><Socialkakao /></>} />
          <Route path="/socialn" element={<><Socialnaver /></>} />
          <Route path="/socialg" element={<><Socialgoogle /></>} />
          <Route path="/about" element={<><About /></>} />

        </Route>
      </Routes>
    </div>

  );
}
const style ={
  minHeight:'100vh',
  backgroundColor: "#151515",
}
export default App;
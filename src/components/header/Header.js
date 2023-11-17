import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../images/CI_White.png";
import Button from "../Button";
import {useCookies} from 'react-cookie';
import ApiService from "../../api/ApiService";


function Header2() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = new useNavigate();
  const goToLoginForm = () => {
    navigate("/login");
  };
  const goToMypage = () => {
    navigate("/mypage");
  };
  const goToSignupForm = () => {
    navigate("/register");
  };
  const goToLogout = () => {
    ApiService.logout( {
        withCredentials: true, // 이 옵션은 쿠키를 전송하기 위해 필요합니다
        headers: {
          'Content-Type': 'application/json',
        },
    })
    .then((res) => {
      removeCookie('is_login')
      removeCookie('token')
      alert("로그아웃 되었습니다.")
      navigate("/");
    })
  }
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <a href="/">
            <img className="navbar-left.img" src={logo} alt="logo" />
          </a>
        </div>
        <div className="sorts-contents">
          <a href="/main" className="menu">
            홈
          </a>
          <a href="#" className="menu">
            영화
          </a>
          <a href="#" className="menu">
            TV프로그램
          </a>
        </div>

        <div className="navbar-right">
          <div className="search-bar">
            <div className="search-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="search-input"
                placeholder="제목, 배우, 감독을 검색해보세요."
                type="text"
              />
            </div>
          </div>
          { cookies.is_login == null ? (
            <div classname="b">
              <Button className="btn-login text-white " onClick={goToLoginForm} label={"로그인"}/>
              <Button className="btn-signup text-white " onClick={goToSignupForm} label={"회원가입"}/>
            </div>
          ) : (
            <div classname="b">
              <Button className="btn-login text-white" onClick={goToLogout} label={"로그아웃"} />
              <Button className="btn-signup text-white " onClick={goToMypage} label={"마이페이지"}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header2;

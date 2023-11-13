import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import './Nav.scss';
import logo from "../images/CI_White.png";

function Header2() {
  const navigate = new useNavigate();
  const goToLoginForm = () => {
    navigate('/login')
  }
  const goToMypage = () => {
    navigate('/mypage')
  }
  const goToSignupForm = () => {
        navigate('/register')
    }
  return (
    <nav className="navbar">
    <div className="navbar-container">
      <div className="navbar-left">
        <a href="/"><img src={logo} alt="logo" /></a>
      </div>
      <div className="sorts-contents">
        <a href="/main" className='menu'>홈</a>
        <a href="#" className='menu'>영화</a>
        <a href="#" className='menu'>TV프로그램</a>
      </div>

    
      <div className="navbar-right">
        <div className="search-bar">
          <div className="search-container">
            <i class="fas fa-search"></i>
            <input
              className="search-input"
              placeholder="제목, 배우, 감독을 검색해보세요."
              type="text"
            />
          </div>
        </div>
        {
          window.localStorage.getItem("token") === null
          ?
          <div classname="b">
            <button className="btn-login text-white" onClick={goToLoginForm}>로그인</button>
            <button className="btn-signup text-white" onClick={goToSignupForm}>회원가입</button></div>
          :
          <div classname="b">
            <button className="btn-login text-white">로그아웃</button>
            <button className="btn-signup text-white" onClick={goToMypage}>마이페이지</button></div>
        }
      </div>
    </div>
  </nav>
  )
}

export default Header2

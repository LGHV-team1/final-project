import React, { Component } from 'react';
import './Nav.scss';
import logo from "../images/CI_White.png";

function Header2() {
  return (
    <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-left">
            <img src={logo} alt="logo" />
            <div className="sorts-contents">
              <span>영화</span>
              <span>TV 프로그램</span>
              <span>책</span>
            </div>
          </div>
          <div className="navbar-right">
            <div className="search-bar">
              <div className="search-container">
                <i class="fas fa-search"></i>
                <input
                  className="search-input"
                  placeholder="작품 제목, 배우, 감독을 검색해보세요."
                  type="text"
                />
              </div>
            </div>
            <button className="btn-login">로그인</button>
            <button className="btn-signup">회원가입</button>
          </div>
        </div>
      </nav>
  )
}

export default Header2

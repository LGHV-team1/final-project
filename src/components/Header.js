import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/CI_White.png";
import Button from "./Button";
import { Cookies } from "react-cookie";
import ApiService from "../../api/ApiService";
import axios from "axios";

function Header2() {
  const cookies = new Cookies();
  const navigate = new useNavigate();
  const csrftoken = cookies.get("csrftoken");
  const goToLoginForm = () => {
    navigate("/login");
  };
  const goToMypage = () => {
    navigate("/mypage");
  };
  const goToSignupForm = () => {
    navigate("/register");
  };
  const config = {
    headers: {
      "X-CSRFToken": csrftoken,
    },
  };
  const goToLogout = () => {
    axios
      .post("http://127.0.0.1:8000/accounts/dj-rest-auth/logout/", {}, config)
      .then((response) => {
        localStorage.removeItem("jwtToken");
        alert("로그아웃 되었습니다.");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <nav className="sticky top-0 bg-black z-10">
      <div className=" pt-10 pb-8 mx-44 w-4/5 flex h-16 justify-between border-b border-gray-300">
        <div className="flex items-center gap-10 ">
          <a href="/">
            <img className="my-1" src={logo} alt="logo" width="200px" />
          </a>

          <div className="flex justify-center sorts-contents gap-3">
            <a href="/main" className=" text-white no-underline">
              홈
            </a>
            <a href="#" className=" text-white no-underline">
              영화
            </a>
            <a href="#" className=" text-white no-underline">
              TV
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3 ">
          <div className="flex relative w-64 h-10 bg-white rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="p-1"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className=" outline-none w-full rounded"
              placeholder="제목, 배우, 감독을 검색해보세요."
              type="text"
            />
          </div>
          {localStorage.getItem("jwtToken") === null ? (
            <div>
              <Button
                className=" mr-5 cursor-pointer text-white "
                onClick={goToLoginForm}
                label={"로그인"}
              />
              <Button
                className=" h-8 px-2 border border-gray-300 rounded-md cursor-pointer text-white "
                onClick={goToSignupForm}
                label={"회원가입"}
              />
            </div>
          ) : (
            <div>
              <Button
                className=" mr-5 cursor-pointer text-white "
                label={"로그아웃"}
              />
              <Button
                className=" h-8 px-2 border border-gray-300 rounded-md cursor-pointer text-white "
                onClick={goToMypage}
                label={"마이페이지"}
              />
            </div>
          )}
        </div>
      </div>
      <div className="p-0 text-xs">a</div>
    </nav>
  );
}

export default Header2;

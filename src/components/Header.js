import React, { Component, useState, useRef, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { debounce } from 'lodash';
import logo from "../images/CI_White.png";
import Button from "./Button";
import { Cookies } from "react-cookie";
import ApiService from "../api/ApiService";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../redux/searchSlice";

function Header2() {
  const searchInputRef = useRef(null); // 입력창 참조 생성
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.value);
  const handleInputChange = (e) => {
    dispatch(setSearchValue(e.target.value));
    debouncedFetch(e.target.value);
  };

  useEffect(() => {
    return () => {
      debouncedFetch.cancel();
    };
  }, []);

  const fetchSearchResults = async (query) => {
    try {
      // const response = await axios.get(`your-api-endpoint?query=${query}`);
      // 여기서 response를 처리하거나 상태에 저장
      // 예: dispatch(setSearchValue(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const debouncedFetch = debounce(fetchSearchResults, 300);

  const handleInputEnter = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?searchWord=${search}`);
      if (searchInputRef.current) {
        searchInputRef.current.blur(); // 입력창 포커스 해제
      }
    }
  };
  const cookies = new Cookies();
  const navigate = new useNavigate();
  const location = new useLocation();
  console.log(location.pathname);
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
  const goToSearch = () => {
    navigate("/search");
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
    <nav className="sticky top-0 bg-black z-10 ">
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
          {location.pathname !== "/search" ? (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#FFFFFF"
                className="p-1 cursor-pointer"
                width="2em"
                onClick={goToSearch}
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ) : (
            <div className="flex relative w-72 h-10 bg-white rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="p-1"
                width="2em"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                ref={searchInputRef}
                className=" outline-none rounded"
                placeholder="제목, 배우, 감독을 검색해보세요."
                type="text"
                onChange={handleInputChange}
                onKeyUp={handleInputEnter}
                autoFocus
              />
            </div>
          )}

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
                onClick={goToLogout}
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

import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Outlet, Link } from "react-router-dom";
import { debounce } from "lodash";
import logo from "../images/tmplogo.png";
import Button from "../components/Button";
import { Cookies } from "react-cookie";
import ApiService from "../api/ApiService";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../redux/searchSlice";
import Dropdown from "../components/Dropdown";
import DarkButton from "../components/DarkButton";

function Header2() {
  const { BASE_URL: URL } = ApiService;
  const searchInputRef = useRef(null); // 입력창 참조 생성
  const dispatch = useDispatch();
  
  const search = useSelector((state) => state.search.value);
  const handleInputChange = (e) => {
    dispatch(setSearchValue(e.target.value));
    debouncedFetch(e.target.value);
  };
  const movieCategory = [
    "SF/환타지", 
    "공포/스릴러",
    "다큐멘터리",
    "단편",
    "드라마",
    "로맨틱코미디",
    "멜로",
    "무협",
    "뮤지컬",
    "애니메이션",
    "액션/어드벤쳐",
    "역사",
    "코미디",
    "기타",
  ];

  const tvCategory = [
    "우리동네",
    "스포츠",
    "라이프",
    "다큐",
    "TV애니메이션",
    "TV드라마",
    "TV 연예/오락",
    "TV 시사/교양",
    "공연/음악",
    "기타"
  ];

  const kidCategory = [ "애니메이션", "오락", "학습" ,"기타"];
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
      'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
    },
  };
  const goToLogout = () => {
    const refreshToken = localStorage.getItem('refresh');
    ApiService.logout(refreshToken)
      .then((response) => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("refresh");
        alert("로그아웃 되었습니다.");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <nav className="sticky top-0 z-10 ">
      <div className=" pt-10 pb-8 mx-44  flex h-16 justify-between border-b border-gray-600">
        <div className="flex items-center gap-10 ">
          <a href="/">
            <img className="my-1" src={logo} alt="logo" width="200px" />
          </a>

          <div className="flex justify-center items-center sorts-contents gap-3 ">
            <Link to="/home" className=" text-gray-400 no-underline hover:text-my-color">
              홈
            </Link>
            <Dropdown categoryName={"영화"} categoryList={movieCategory} link={"movie"}/>
            <Dropdown categoryName={"TV"} categoryList={tvCategory} link={"tv"}/>
            <Dropdown categoryName={"키즈"} categoryList={kidCategory} link={"kids"} />
          </div>
        </div>

        <div className="flex items-center gap-3 ">
          {location.pathname !== "/search" ? (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#BDBDBD"
                className="p-1 cursor-pointer hover:scale-105"
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
                fill="gray-400"
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
                className=" outline-none rounded transition-opacity duration-1000 ease-in-out opacity-100"
                placeholder="제목, 배우를 검색해보세요."
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
                className=" mr-5 cursor-pointer text-gray-400 "
                onClick={goToLoginForm}
                label={"로그인"}
              />
              <Button
                className=" h-8 px-2 border border-gray-300 rounded-md cursor-pointer text-gray-400 "
                onClick={goToSignupForm}
                label={"회원가입"}
              />
            </div>
          ) : (
            <div>
              <Button
                className=" mr-5 cursor-pointer text-gray-400 hover:text-my-color "
                onClick={goToLogout}
                label={"로그아웃"}
              />
              <Button
                className=" h-8 px-2  rounded-md cursor-pointer text-gray-400 hover:text-my-color"
                onClick={goToMypage}
                label={"마이페이지"}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header2;

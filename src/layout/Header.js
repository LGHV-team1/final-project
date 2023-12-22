import React, { useRef, useEffect, useState, } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "../images/seasonlogo.png";
import Button from "../components/Button";
import ApiService from "../api/ApiService";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../redux/searchSlice";
import Dropdown from "../components/Dropdown";
import useDebounce from "../hook/useDebounce";

function Header2() {
  const searchInputRef = useRef(null); // 입력창 참조 생성
  const dispatch = useDispatch();
  //const [search, setSearch] = useState();
  const navigate = new useNavigate();
  const location = new useLocation();
  const [isScroll, setIsScroll] = useState(false);
  const searchValue = useSelector((state) => state.search.value);
  const [search, setSearch] = useState(searchValue);
  const debouncedValue = useDebounce(search, 500);
  useEffect(() => {
    // 리덕스 스토어의 searchValue 상태가 변경될 때마다 검색 입력창의 값 업데이트
    setSearch(searchValue);
  }, [searchValue]);

  // ... 나머지 코드

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    dispatch(setSearchValue(e.target.value));
  };
  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    dispatch(setSearchValue(debouncedValue));
  }, [debouncedValue]);
  // const handleInputChange = (e) => {
  //   setSearch(e.target.value);
  // };
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    console.log(location.pathname)
    // '/search' 경로일 때만 확장 상태를 true로 설정합니다.
    if (location.pathname === "/search") {
      setIsExpanded(true);
    }
  }, [location.pathname]);

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
    "기타",
  ];

  const kidCategory = ["애니메이션", "오락", "학습", "기타"];

  const handleInputEnter = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?searchWord=${search}`);
      if (searchInputRef.current) {
        searchInputRef.current.blur(); // 입력창 포커스 해제
      }
    }
  };
  

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
    setIsExpanded(true);
  };

  const goToLogout = () => {
    const refreshToken = localStorage.getItem("refresh");
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
    <nav className={`sticky top-0 z-50 transition-all duration-300 ease-in-out ${isScroll ? " bg-bg-color " : "bg-transparent"}`}>
      <div className=" pt-10 pb-8 mx-28  flex h-16 justify-between ">
        <div className="flex items-center xl:gap-10 sm:gap-3">
          <Link to="/">
            <img className="my-1" src={logo} alt="logo" width="110px" />
          </Link>

          <div className="flex justify-center items-center sorts-contents xl:gap-3 sm:gap-2">
            <Link
              to="/home"
              className=" text-gray-100 no-underline hover:text-my-color"
            >
              홈
            </Link>
            <Dropdown
              categoryName={"영화"}
              categoryList={movieCategory}
              link={"movie"}
            />
            <Dropdown
              categoryName={"TV"}
              categoryList={tvCategory}
              link={"tv"}
            />
            <Dropdown
              categoryName={"키즈"}
              categoryList={kidCategory}
              link={"kids"}
            />
            <Link to="/shortfilm" className="no-underline text-gray-100 hover:text-my-color">
              숏필름
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3 ">
          {location.pathname !== "/search" ? (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#ffffff"
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
            <div
              className="flex relative  h-10 bg-white rounded"
              style={{
                width: isExpanded ? "15rem" : "0", 
                transition: "width 0.5s ease-in", 
                overflow: "hidden", 
              }}
            >
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
                className=" outline-none rounded "
                placeholder="제목, 배우를 검색해보세요"
                type="text"
                onChange={handleInputChange}
                onKeyUp={handleInputEnter}
                autoFocus
              />
            </div>
          )}
            <div>
              <Button
                className=" mr-5 cursor-pointer text-gray-100 hover:text-my-color "
                onClick={goToLogout}
                label={"로그아웃"}
              />
              <Button
                className=" h-8 px-2  rounded-md cursor-pointer text-gray-100 hover:text-my-color"
                onClick={goToMypage}
                label={"마이페이지"}
              />
            </div>
          {/* )} */}
        </div>
      </div>
    </nav>
  );
}

export default Header2;

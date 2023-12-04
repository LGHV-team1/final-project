import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../redux/categorySlice";
import { getCategoryValue } from "../hook/useCategory";
export default function Dropdown({ categoryName, categoryList, link }) {
  const leaveTimeout = useRef(null);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const gotoCategory = () => {
    navigate(`${link}`);
  };

  const handleMouseEnter = () => {
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
    }
    setShowDropdown(true);
  };
  const handleMouseLeave = () => {
    leaveTimeout.current = setTimeout(() => {
      setShowDropdown(false);
    }, 50); // 500ms 후에 드롭다운을 숨깁니다.
  };

  useEffect(() => {
    return () => {
      if (leaveTimeout.current) {
        clearTimeout(leaveTimeout.current);
      }
    };
  }, []);

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md   text-white shadow-sm ring-1 ring-inset  hover:scale-105"
          id="menu-button"
          aria-expanded={showDropdown}
          aria-haspopup={showDropdown}
          onClick={gotoCategory}
        >
          {categoryName}
        </button>
      </div>
      {showDropdown && ( // 조건부 렌더링
        <div
          className="absolute z-10 w-40  rounded-md bg-black opacity-90 shadow-lg "
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="pt-3 pl-2">
            {categoryList.map((item) => {
              // 각 항목에 대한 URL을 즉시 계산
              const dynamicUrl = `/${link}?category=${getCategoryValue(
                link,
                item
              )}`;

              return (
                <div className="py-2" key={item}>
                  <Link
                    to={dynamicUrl}
                    className="ml-2 text-gray-100 no-underline hover:text-my-color"
                    onClick={() => {
                      dispatch(setCategory(item))
                    }}
                  >
                    {item}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

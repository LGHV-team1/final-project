import React from "react";
import Top5 from "../components/Top5";
import mvimg1 from "../images/mvTop/mv범죄도시.jpg";
import mvimg2 from "../images/mvTop/mv러브포세일.jpg";
import mvimg3 from "../images/mvTop/mv밀수.jpg";
import mvimg4 from "../images/mvTop/mv엘리멘탈.jpg";
import mvimg5 from "../images/mvTop/mv비공식작전.jpg";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
function Movie() {
  const detailcategory = useSelector((state) => state.category.value);
  const { category } = useParams();
  console.log(detailcategory);
  console.log(category);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchWord = searchParams.get("searchWord");
  console.log(searchWord)
  const bgArr = [
    { id: 1, img: mvimg1, vodname: "범죄도시3" },
    { id: 2, img: mvimg2, vodname: "러브 포 세일" },
    { id: 3, img: mvimg3, vodname: "밀수" },
    { id: 4, img: mvimg4, vodname: "엘리멘탈" },
    { id: 5, img: mvimg5, vodname: "비공식작전" },
  ];

  if (category === undefined) {
    return (
      <div className="max-w-[1100px] w-[1100px] mx-auto text-center my-10">
        <div className="mb-20">
          <div className="text-center">
            <p>영화 인기 TOP5</p>
          </div>
          <div className="text-center mt-3">
            <Top5 images={bgArr} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default Movie;

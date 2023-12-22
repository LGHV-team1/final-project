import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import mainimg1 from "../images/MainTop/엘리멘탈.jpg";
import mainimg2 from "../images/MainTop/아바타.jpg";
import mainimg3 from "../images/MainTop/밀수.jpg";
import mainimg4 from "../images/MainTop/소방서.jpg";
import mainimg5 from "../images/MainTop/가오갤.jpg";
import title1 from "../images/MainTop/엘리멘탈제목.png";
import title2 from "../images/MainTop/아바타제목.png";
import title3 from "../images/MainTop/밀수제목.png";
import title4 from "../images/MainTop/소방서제목.png";
import title5 from "../images/MainTop/가오갤제목4.png";
import styled from "styled-components";
import Streaming from "./Streaming";
import { Arrowleft, Arrowright } from "./ArrowBtn";
function Top5() {
  const bgArr = [
    { id: 2289, img: mainimg1, vodname: "엘리멘탈", title: title1 },
    { id: 4140, img: mainimg2, vodname: "아바타2", title: title2 },
    { id: 2867, img: mainimg3, vodname: "밀수", title: title3 },
    {
      id: 1156,
      img: mainimg4,
      vodname: "소방서 옆 경찰서 그리고 국과수",
      title: title4,
    },
    {
      id: 2352,
      img: mainimg5,
      vodname: "가디언즈 오브 갤럭시3",
      title: title5,
    },
  ];
  const [trailerId, setTrailerId] = useState(2289);
  const [currentSlide, setCurrentSlide] = useState(0);
  const findVodname = bgArr.find((item) => item.id === trailerId);

  const settings = {
    className: "center",
    focusOnSelect: true,
    centerMode: true,
    centerPadding: "5px",
    dots: false,
    infinite: true, // 슬라이드가 끝까지 가면 다시 처음으로 반복
    slidesToShow: 3, // 한 번에 보여줄 슬라이드 개수
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentSlide(next),
    afterChange: (index) => {
      setCurrentSlide(index);
      setTrailerId(bgArr[index].id); // 현재 중앙 슬라이드의 ID를 설정
    },
    nextArrow: <Arrowright />,
    prevArrow: <Arrowleft />,
  };

  return (
    <div className=" ">
      <Streaming id={trailerId} titleimg={findVodname.title} />
      <div className="relative mx-28  xl:bottom-[468px] sm:bottom-[320px] z-20">
        <StyledSlider {...settings}>
          {bgArr.map((a, index) => (
            <div
              key={a.id}
              className={`rounded-md block outline-none transition-all duration-300 ease-in-out ${
                currentSlide === index ? "scale-110" : "scale-75 opacity-50"
              }`}
            >
              <img
                onClick={() => {
                  setTrailerId(a.id);
                }}
                className="rounded-md transition transform duration-500 ease-in-out w-full h-full"
                src={a.img}
                alt={a.vodname}
                width={"70%"}
                
              />
            </div>
          ))}
        </StyledSlider>
      </div>
    </div>
  );
}
export default Top5;

const StyledSlider = styled(Slider)`
  height: 100%;
  width: 100%;
  position: relative;
`;

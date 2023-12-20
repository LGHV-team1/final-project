import React, { useState } from "react";
import ReactPlayer from "react-player";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Arrowleft, Arrowright } from "../components/ArrowBtn";
function Trailer() {
  const shortFilmIdArr = [
    { id: 1, vodname: "엘리멘탈" },
    { id: 2, vodname: "천원짜리 변호사" },
    { id: 3, vodname: "제철장터" },
    { id: 4, vodname: "해리포터와 함께하는 크리스마스" },
    { id: 5, vodname: "매트릭스 명장면" },
  ];
  const [shortFilmId, setShortFilmId] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    dots: false,
    infinite: true, // 슬라이드가 끝까지 가면 다시 처음으로 반복
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 개수
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentSlide(next),
    afterChange: (index) => {
      setCurrentSlide(index);
      setShortFilmId(shortFilmIdArr[index].id); // 현재 중앙 슬라이드의 ID를 설정
    },
    nextArrow: <Arrowright />,
    prevArrow: <Arrowleft />,
  };
  return (
    <div className="text-6xl text-white h-[100vh] mx-56 ">
        
      <Slider {...settings}>
        {shortFilmIdArr.map((item) => (
          <ReactPlayer
            width="100%"
            height="100%"
            url={`https://rvdshortvideo.s3.ap-northeast-2.amazonaws.com/sv${item.id}.mp4`}
            playing={true}
            volume={false}
            loop={true}
          />
        ))}
      </Slider>
    </div>
  );
}

export default Trailer;

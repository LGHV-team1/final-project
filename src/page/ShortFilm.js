import React, { useState } from "react";
import ReactPlayer from "react-player";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Arrowleft, Arrowright } from "../components/ArrowBtn";
import { Link } from "react-router-dom";

function ShortFilm() {
  const shortFilmIdArr = [
    { id: 0, vodname: "엘리멘탈 명장면", url: 2289 },
    { id: 1, vodname: "천원짜리 변호사", url: 1234 },
    { id: 2, vodname: "제철장터", url: 0 },
    { id: 3, vodname: "해리포터와 함께하는 크리스마스", url: 2226 },
    { id: 4, vodname: "매트릭스 명장면", url: 3511 },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [volume, setVolume] = useState("0");
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "-1px",
    slidesToShow: 3,
    speed: 500,
    focusOnSelect: true,
    dots: false,
    infinite: true,
    swipeToSlide: true,
    beforeChange: (current, next) => setCurrentSlide(next),
    afterChange: (index) => {
      setCurrentSlide(index);
    },
    nextArrow: <Arrowright />,
    prevArrow: <Arrowleft />,
  };

  return (
    <div className=" text-white h-[100vh] mx-28">
      
      <Slider {...settings}>
        {shortFilmIdArr.map((item, index) => (
          <div
            key={item.id}
            className={` my-56 ${
              currentSlide === index ? " scale-[230%]" : " z-0"
            }`}
          >
            <ReactPlayer
              url={`https://rvdshortvideo.s3.ap-northeast-2.amazonaws.com/sv${item.id}.mp4`}
              playing={currentSlide === index}
              volume={volume}
              loop={true}
              width="100%"
              height="100%"
            />
            {currentSlide === index ? (
              <div className="flex justify-between">
                <p className="text-xl text-center">{item.vodname}</p>
                {item.url === 0 ? (
                  <a href="https://seasonmarket.co.kr/" className="no-underline text-gray-100 hover:text-my-color">더보기</a>
                ) : (
                  <Link
                    to={`/detail/${item.url}`}
                    className="no-underline text-gray-100 hover:text-my-color"
                  >
                    <p className="text-[8px]">더보기</p>
                  </Link>
                )}
              </div>
            ) : null}
          </div>
        ))}
      </Slider>
      <div className="relative bottom-44 left-48">
      {volume === "1" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#FFFFFF"
                data-slot="icon"
                height="3em"
                width="3em"
                onClick={() => {
                  setVolume("0");
                }}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#FFFFFF"
                data-slot="icon"
                height="3em"
                width="3em"
                onClick={() => {
                  setVolume("1");
                }}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                />
              </svg>
            )}
    </div>
    </div>
  );
}
export default ShortFilm;

import React, { useState } from "react";
import ReactPlayer from "react-player";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Arrowleft, Arrowright } from "../components/ArrowBtn";
import { Link } from "react-router-dom";

function ShortFilm() {
  const shortFilmIdArr = [
    {
      id: 0,
      vodname: "이게 진짜 파도타기지💙🌊 #엘리멘탈 #shortfilm",
      url: 2289,
    },
    {
      id: 1,
      vodname: "스토브리그 봤어요~?⚾ 기습질문 #천원짜리변호사",
      url: 1234,
    },
    { id: 2, vodname: "제철장터 🍎🦀🍗 #산지직송", url: 0 },
    {
      id: 3,
      vodname:
        "크리스마스에 해리한테 인사받는 법🎄 #24일23시3분21초 #해리포터마법사의돌",
      url: 2226,
    },
    {
      id: 4,
      vodname: "중국에서 펜트하우스를 만든다면? #펜트하우스 #천서진!!!",
      url: 3892,
    },
    {
      id: 5,
      vodname: "담당 작가에게 일어난 기이한 현상😱 #심야괴담회 #230718방송",
      url: 143,
    },
    {
      id: 6,
      vodname:
        "장윤정도 모르는 장윤정이 부른 노래 ㅋㅋ #장윤정 #장윤정의도장깨기",
      url: 4170,
    },
    { id: 7, vodname: "그루트 춤추는 장면🌳 #아임그루트 #가오갤2", url: 3439 },
    {
      id: 8,
      vodname: "범죄도시2 손석구가 납치한 진짜이유 #범죄도시2 #추앙해",
      url: 723,
    },
    {
      id: 9,
      vodname: "우리의 영원한 아기 판다 푸바오🐼와 강철원 사육사 #TV동물농장",
      url: 3,
    },
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
  const [play, setPlay] = useState(true);
  return (
    <div className=" text-white h-[100vh] mx-28">
      <Slider {...settings}>
        {shortFilmIdArr.map((item, index) => (
          <div
            key={item.id}
            className={` my-56 ${
              currentSlide === index ? " scale-[230%]" : ""
            } transition-all duration-300 ease-in-out`}
          >
            <ReactPlayer
              url={`https://rvdshortvideo.s3.ap-northeast-2.amazonaws.com/sv${item.id}.mp4`}
              playing={currentSlide === index}
              volume={volume}
              loop={true}
              width="100%"
              height="100%"
              // onClick={setPlay((current) => !current)}
            />
            {currentSlide === index ? (
              <div>
                {item.url === 0 ? (
                  <a
                    href="https://seasonmarket.co.kr/"
                    className="no-underline text-[8px] text-gray-100 text-center "
                  >
                    <p className="text-[12px] text-center mb-0">
                      {item.vodname}
                    </p>
                  </a>
                ) : (
                  <Link
                    to={`/detail/${item.url}`}
                    className="no-underline text-gray-100 text-center"
                  >
                    <p className="text-[12px] text-center mb-0">
                      {item.vodname}
                    </p>
                  </Link>
                )}

                {volume === "1" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#FFFFFF"
                    data-slot="icon"
                    height="1em"
                    width="1em"
                    onClick={() => {
                      setVolume("0");
                    }}
                    className=" cursor-pointer relative bottom-[18px]"
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
                    height="1em"
                    width="1em"
                    onClick={() => {
                      setVolume("1");
                    }}
                    className=" cursor-pointer relative bottom-[18px]"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                    />
                  </svg>
                )}
              </div>
            ) : null}
          </div>
        ))}
      </Slider>
      <div className="relative bottom-44 left-48"></div>
    </div>
  );
}
export default ShortFilm;

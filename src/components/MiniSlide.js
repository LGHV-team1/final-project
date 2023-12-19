import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { Arrowleft, Arrowright } from "./ArrowBtn";
function MiniSlide({ data, slidesToShowNum = 6, slidesToScrollNum = 1 }) {
  const BASE_URL = "https://image.tmdb.org/t/p/w500";
  const BASE_URL_NO = "https://i.ibb.co/7pYHFY3";
  

  const settings = {
    arrow: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShowNum,
    slidesToScroll: slidesToScrollNum,
    nextArrow: <Arrowright />,
    prevArrow: <Arrowleft />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 1,
          arrow: true,
          dots: false,
          infinite: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
          arrow: true,
          dots: false,
          infinite: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrow: true,
          dots: false,
          infinite: false,
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings} className="text-center">
        {data.map((a, idx) => (
          <div key={a.id} className="relative mb-3 rounded-lg">
            <div className=" pb-2 rounded-lg ">
              <Link to={`/detail/${a.id}`} className="rounded-lg block pr-3 ">
                <img
                  className="  rounded-lg block transition transform duration-500 ease-in-out hover:scale-95"
                  src={
                    a.imgpath === "/noimage.png"
                      ? `${BASE_URL_NO}${a.imgpath}`
                      : `${BASE_URL}${a.imgpath}`
                  }
                  alt={a.vodname}
                  style={{
                    objectFit: "object-fill",
                    width: "230px",
                    height: "350px",
                  }}
                />
              </Link>
              <h1
                className="absolute bottom-[-5%] left-[1%] italic  shadow-2xl font-bold text-white text-6xl bg-transparent"
                style={{ textShadow: "2px 2px 4px black" }}
              >
                {idx + 1}
              </h1>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
export default MiniSlide;

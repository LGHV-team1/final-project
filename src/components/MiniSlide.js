import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
function MiniSlide({
  data,
  className,
  slidesToShowNum = 5,
  slidesToScrollNum = 1,
}) {
  const BASE_URL = "https://image.tmdb.org/t/p/w500";
  const BASE_URL_NO = "https://i.ibb.co/7pYHFY3";
  const Arrowright = ({ onClick }) => (
    <div
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        right: "-10px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#999">
        <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
      </svg>
    </div>
  );
  const Arrowleft = ({ onClick }) => (
    <div
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        left: "-30px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#999">
        <path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" />
      </svg>
    </div>
  );
      
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
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div>
      <Slider {...settings} className="text-center">
        {data.map((a, idx) => (
          <div key={a.id} className="relative mb-3 rounded-lg">
            <div className=" pb-2 rounded-lg">
              <Link
                to={`/detail/${a.id}`}
                className="rounded-lg overflow-hidden block pr-3 "
              >
                <img
                  className="rounded-lg overflow-hidden block transition transform duration-500 ease-in-out hover:scale-110"
                  src={
                    a.imgpath === "/noimage.png"
                      ? `${BASE_URL_NO}${a.imgpath}`
                      : `${BASE_URL}${a.imgpath}`
                  }
                  alt={a.vodname}
                  style={{
                    objectFit: "cover",
                    width: "300px",
                    height: "450px",
                  }}
                />
              </Link>
              
              <h1
                className="absolute bottom-[-5%] left-[1%] italic z-1000 shadow-2xl font-bold text-white text-6xl bg-transparent"
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
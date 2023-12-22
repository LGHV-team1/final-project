import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { Arrowleft, Arrowright } from "./ArrowBtn";
function MiniSlide({
  data,
  slidesToShowNum = 6,
  slidesToScrollNum = 1,
}) {
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
        breakpoint: 1025,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          initialSlide:1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
       
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings} className="text-center ">
        {data.map((a, idx) => (
          <div key={a.id} className="relative mb-2  ">
            <div className="img-body pb-2   ">
              <Link to={`/detail/${a.id}`}>
                <div className="rounded-lg overflow-hidden block ">
                  <img
                    className="rounded-lg transition transform duration-500 ease-in-out hover:scale-95"
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
                </div>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
export default MiniSlide;

import React, { useEffect, useState } from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

function MiniSlide({images, className, slidesToShowNum = 5, slidesToScrollNum =1, }) {
    const BASE_URL = "https://image.tmdb.org/t/p/w300"
    const BASE_URL_NO = "https://i.ibb.co/7pYHFY3"
    
    const Arrowright = ({onClick}) => (
        <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '-30px', cursor: 'pointer'}} onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/>
            </svg>
        </div>
    );
    const Arrowleft = ({onClick}) => (
        <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '-30px', cursor: 'pointer'}} onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z"/>
            </svg>
        </div>
    );

   const settings = {
    arrow: false,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: {slidesToShowNum},
    slidesToScroll: {slidesToScrollNum},
    nextArrow: <Arrowright />,
    prevArrow: <Arrowleft />,
  };
    return (
        <div>
            <Slider {...settings} className="text-center w-[97%] m-auto">
                {images.map((a) => (
                    <div key={a.id} className="relative">
                        <div className="img-body">
                            <Link to={`/detail/${a.vodname}`} className="">
                            <img src={a.vodimage === "/noimage.png" ? `${BASE_URL_NO}${a.vodimage}` : `${BASE_URL}${a.vodimage}`} alt={a.vodname} style={{objectFit:"cover", width:"190px", height:"280px"}} />
                            </Link>
                        </div>
                    </div>))}
            </Slider>
        </div>
    )
}
export default MiniSlide;
import React, { useEffect, useState } from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

function Top5({ images }) {

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
    dots: true,          // 캐러셀 밑에 ... 을 표시할지
    infinite: true,      // 슬라이드가 끝까지 가면 다시 처음으로 반복
    autoplay: true,      // 자동 재생
    autoplaySpeed: 3000, // 자동 재생 속도
    slidesToShow: 1,     // 한 번에 보여줄 슬라이드 개수
    slidesToScroll: 1,
    nextArrow: <Arrowright />,
    prevArrow: <Arrowleft />,
  };
    return (
        <div>
            <Slider {...settings} >
                {images.map((a) => (
                    <div key={a.id} className="relative">
                        <div className="img-body">
                        <Link to={`/detail/${a.vodname}`} className="">
                            <img src={a.img} alt={a.vodname} style={{objectFit:"cover", width:"1100px", height:"500px"}} />
                            </Link>
                        </div>
                    </div>))}
            </Slider>
        </div>
    )
}
export default Top5;
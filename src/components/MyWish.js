import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ApiService from '../api/ApiService';
function MyWish() {
    const BASE_URL = "https://image.tmdb.org/t/p/w500";
    const BASE_URL_NO = "https://i.ibb.co/7pYHFY3";
    const Arrowright = ({ onClick }) => (
      <div
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          right: "-30px",
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

    const [wishList, setWishList] = useState([]);

    useEffect(() => {
        ApiService.getMywish()
        .then(response => {
            setWishList(response.data);
        })
    }, [wishList]);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <Arrowright />,
        prevArrow: <Arrowleft />,
      };
    return (
        <div className="text-gray-300">
        <div className="block text-end mb-2">총 {wishList.length}건</div>
        <Slider  {...settings} >
          {wishList.length === 0 ? (
                <p>위시리스트가 비었습니다.</p>
            ) :
               ( wishList.map((a) => (
                    <div key={a.id} className="relative">
                        <div className="img-body">
                        <Link to={`/detail/${a.vod_id}`} className="hover:opacity-50">
                            <img
                            className="rounded"
                            src={
                                a.vodimage === "/noimage.png"
                                ? `${BASE_URL_NO}${a.vodimage}`
                                : `${BASE_URL}${a.vodimage}`
                            }
                            alt={a.vodname}
                            style={{
                                objectFit: "cover",
                                width: "230px",
                                height: "350px",
                            }}
                            />
                        </Link>
                        </div>
                    </div>)))}
            </Slider >
        </div>
    )
}
export default MyWish;
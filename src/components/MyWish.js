import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ApiService from "../api/ApiService";
import Spinner from "./Spinner";
import { Arrowleft, Arrowright } from "./ArrowBtn";
function MyWish() {
  const BASE_URL = "https://image.tmdb.org/t/p/w500";
  const BASE_URL_NO = "https://i.ibb.co/7pYHFY3";
  const [loading, setLoading] = useState(true);
 

  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    ApiService.getMywish().then((response) => {
      setWishList(response.data);
      setLoading(false);
    });
  }, [wishList]);

  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <Arrowright/>,
    prevArrow: <Arrowleft />,
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="text-gray-300">
          <div className="block text-end mb-2">총 {wishList.length}건</div>
          <Slider {...settings}>
            {wishList.length === 0 ? (
              <p>위시리스트가 비었습니다.</p>
            ) : (
              wishList.map((a) => (
                <div key={a.id} className="relative">
                  <div className="img-body">
                    <Link
                      to={`/detail/${a.vod_id}`}
                      className="hover:opacity-50"
                    >
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
                </div>
              ))
            )}
          </Slider>
        </div>
      )}
    </>
  );
}
export default MyWish;

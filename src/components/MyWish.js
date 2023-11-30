import React, { useEffect, useState } from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ApiService from '../api/ApiService';
import MiniSlide from "./MiniSlide";
function MyWish() {
    const [wishList, setWishList] = useState([]);
    useEffect(() => {
        ApiService.getMywish()
        .then(response => {
            setWishList(response.data);
            console.log(response.data)
        })
    }, []);
  
    return (
        <div>
        <div className="block text-end mb-2">총 {wishList.length}건</div>
        <MiniSlide images={wishList}/>
        </div>
    )
}
export default MyWish;
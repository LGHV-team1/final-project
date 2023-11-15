import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleLeft  } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import styled from "styled-components";

export const StyledSlider = styled(Slider)`
.slick-arrow{
    opacity: 100
}
.slick-prev {
    left: 20px !important;
    z-index: 1000;
  }

.slick-next {
    right: 20px !important;
    z-index: 1000;
  }
`

function miniSlide() {
    const BASE_URL = "https://image.tmdb.org/t/p/w300"
    const Listitem = [
        {id: 1, name: "효심이네 각자도생",imgurl: "/1cfjiYe7vCh1oNUK0DuCKuvinrv.jpg"},
        {id: 2, name: "인어공주", imgurl: "/do9pxOrrFqgyebHwxj2IYtZXQIp.jpg"},
        {id: 3, name: "스즈메의 문단속",imgurl: "/kVS51ssZF1y0IXF342h54cIJ0EK.jpg"},
        {id: 4, name: "거침없이 하이킥",imgurl: "/maYp8s3vQtVeHTrI4hglL0TuN4g.jpg"},
        {id: 5, name: "파리의 연인",imgurl: "/FTEylxvgpvEX1kS1PJtLQtGzc.jpg"},
        {id: 6, name: "스토브리그",imgurl: "/wRItaA5mCd0kS3AXxa46IuRrwLL.jpg"},
        {id: 7, name: "콘크리트 유토피아",imgurl: "/aKApVX9hc5otPxa3Jbf27sW6tsi.jpg"},
   ]
   const settings = {
    arrow: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
    return (
        <div>
            <StyledSlider {...settings}>
                {Listitem.map((a) => (
                    <div key={a.id} >
                        <div className="img-body">
                        <img src={`${BASE_URL}${a.imgurl}`} alt='slide_image' style={{objectFit:"cover", width:"190px", height:"280px"}} />
                        </div>
                    </div>))}
            </StyledSlider>
        </div>
    )
}
export default miniSlide
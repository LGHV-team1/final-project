import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledSlider = styled(Slider)`
  height: 100%;
  width: 100%;
  position: relative;
  .slick-dots {
    left: 50%;
    width: auto;
    z-index: 10;
    transform: translate(-50%, -150%);

    li {
      width: 8px;
      height: 8px;
      margin: 3px;

      button {
        width: 100%;
        height: 100%;
        padding: 0;

        &::before {
          width: 8px;
          height: 8px;
          position: static;
          top: auto;
          left: auto;
          right: auto;
          background: white;
          border-radius: 100%;
          color: transparent;
        }
      }
    }
  }
`;

function Top5({ id,images }) {
  const Arrowright = ({ onClick }) => (
    <div
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        right: "-20px",
        cursor: "pointer",
        zIndex: 20 // 화살표가 다른 요소 위에 표시되도록 z-index 설정
      }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        fill="#999"
      >
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        fill="#999"
      >
        <path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" />
      </svg>
    </div>
  );

  const settings = {
    dots: false,
    infinite: true, // 슬라이드가 끝까지 가면 다시 처음으로 반복
    slidesToShow: 3, // 한 번에 보여줄 슬라이드 개수
    slidesToScroll: 1,
    nextArrow: <Arrowright />,
    prevArrow: <Arrowleft />,
  };
  return (
    <div>

      <StyledSlider {...settings}>
        {images.map((a) => (
          <div key={a.id} className="relative rounded-lg">
            
            <Link to={`/detail/${a.id}`} className="rounded-lg block pr-7">
              <img
                className=" transition transform duration-500 ease-in-out hover:scale-95 "
                src={a.img}
                alt={a.vodname}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </Link>
          </div>
        ))}
      </StyledSlider>
    </div>
  );
}
export default Top5;

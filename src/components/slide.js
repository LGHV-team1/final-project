import styled from "styled-components";
import React from "react";
import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.jpg";
import img4 from "../images/img4.jpg";
import img5 from "../images/img5.jpg";
import { useEffect, useRef, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const Background = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;

  .Left {
    top: 50%;
    left: 3%;
    transform: translate(-50%, -50%);
    color: rgba(235, 235, 235, 0.3);
    &:hover {
      color: rgba(235, 235, 235, 0.5);
    }
  }
  .Right {
    top: 50%;
    left: 97%;
    transform: translate(-50%, -50%);
    color: rgba(235, 235, 235, 0.3);
    &:hover {
      color: rgba(235, 235, 235, 0.5);
    }
  }
`;

/* bg img slider */
const SlideBtn = styled.div`
  z-index: 100;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImgContainer = styled.div`
  display: flex;
  overflow: hidden;
`;

const ImgBox = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

/* bg img Array */
const bgArr = [
  { img: img1, key: 1 },
  { img: img2, key: 2 },
  { img: img3, key: 3 },
  { img: img4, key: 4 },
  { img: img5, key: 5 },
];


const useInterval = (callback, interval) => {
  const savedCallback = useRef(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (interval !== null && interval !== 10000000) {
      let id = setInterval(tick, interval);
      return () => clearInterval(id);
    }
  }, [interval]);
};

function Slide() {
  const [slideIndex, setSlideIndex] = useState(1);
  const [slideInterval, setSlideInterval] = useState(6000); // slideInterval 6 secs

  const slideRef = useRef(null);

  const BG_NUM = bgArr.length;
  const beforeSlide = bgArr[BG_NUM - 1];
  const afterSlide = bgArr[0];

  let slideArr = [beforeSlide, ...bgArr, afterSlide]; // create slide array (last, origin(first,...,last) ,first) for infinite slide show
  const SLIDE_NUM = slideArr.length;

  useInterval(() => setSlideIndex((prev) => prev + 1), slideInterval); // auto slide show with slideInterval

  /* InfiniteSlideHandler attachs last/first imgs with origin last/first imgs to make slide seem infinite */
  const InfiniteSlideHandler = (flytoIndex: number) => {
    setTimeout(() => {
      if (slideRef.current) {
        slideRef.current.style.transition = "";
      }
      setSlideIndex(flytoIndex);
      setTimeout(() => {
        if (slideRef.current) {
          slideRef.current.style.transition = "all 500ms ease-in-out";
        }
      }, 100);
    }, 500);
  };

  if (slideIndex === SLIDE_NUM - 1) {
    // if first img (slide array's last item) -> go to origin first img
    InfiniteSlideHandler(1);
  }

  if (slideIndex === 0) {
    // if last img (slide array's first item) -> go to origin last img
    InfiniteSlideHandler(BG_NUM);
  }

  const intervalHandler = () => {
    // when InfiniteSlideHandler works for first img (slide array's last item), control slideInterval to show transition animation normally
    if (slideIndex === SLIDE_NUM - 1) {
      setSlideInterval(500);
    } else {
      setSlideInterval(6000);
    }
  };

  /* SlideHandler for buttons */
  const slideHandler = (direction: number) => {
    setSlideIndex((prev) => prev + direction);
  };

  /* stopAutoSlide when controlling slide with buttons */
  const stopAutoSlide = () => {
    setSlideInterval(10000000);
  };

  return (
    <>
      <Background>
        <SlideBtn
          className="Left"
          onMouseEnter={stopAutoSlide}
          onMouseLeave={intervalHandler}
          onClick={() => slideHandler(-1)}
        >
          <FaAngleLeft size="40" />
        </SlideBtn>
        <ImgContainer
          ref={slideRef}
          style={{
            width: `${100 * SLIDE_NUM}vw`,
            transition: "all 500ms ease-in-out",
            transform: `translateX(${
              -1 * ((100 / slideArr.length) * slideIndex)
            }%)`,
          }}
        >
          {slideArr.map((item, index) => (
            <ImgBox key={index}>
              <img src={item.img} />
            </ImgBox>
          ))}
        </ImgContainer>
        <SlideBtn
          className="Right"
          onMouseEnter={stopAutoSlide}
          onMouseLeave={intervalHandler}
          onClick={() => slideHandler(+1)}
        >
          <FaAngleRight size="40" />
        </SlideBtn>
      </Background>
    </>
  );
}

export default Slide;
import React, { useState } from "react";
import Review from "../components/Review";
import "./Detail.css"
function Detail() {
  const [wish, setWish] = useState(false);
  const handleWish = () => {
    setWish((current) => !current);
  };
  const [reviewShow, setReviewShow] = useState(false);
  const handleReviewShow = () => {
    setReviewShow(true);
  };
  const backgroundImageUrl = "https://image.tmdb.org/t/p/w500/kcrjQkK9XlUe0yD1cZptf4z5h3v.jpg";
  return (
    <>
    <div  className="w-fit h-fit bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImageUrl})` }} >
    <h5 className="mb-4 text-white">
              2023 드라마 한국 
              {/* 년도 장르 국가 */}
              <br/>
              2시간 21분 12세
              {/* 러닝타인 연령 */}
              <br />
              출연진 ...
              {/* 출연진 */}
            </h5>
    </div>
    <div className="flex mx-32 mt-10 mb-10 gap-10 ">
        <img
          className="w-80"
          src="https://an2-img.amz.wtchn.net/image/v2/y8zw23wQG88i2Y3lNWetpQ.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk9UazFPVEkwTmpnM016QTVNamd6TWpFaWZRLjFQU194eWZtVWFUZG5KUmhsY2V5RHVlVnZXVVhEQ2hhYlhnY01KZ1Fka1k"
        />
        <div >
          <div>
            <div className="mb-4 grid grid-cols-2 items-center">
              <h1 className=" font-bold justify-start "> 서울의 봄 </h1>
              <div className="flex justify-end gap-10 text-gray-600 ">
                {wish === false ? (
                  <div className="icon-container hover:text-gray-800 hover:scale-105">
                    <svg
                      viewBox="0 0 24 24"
                      fill="#BDBDBD"
                      height="4em"
                      width="4em"
                      className="icon"
                      onClick={handleWish}
                    >
                      <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
                    </svg>
                    위시 추가
                  </div>
                ) : (
                  <div className="icon-container hover:text-gray-800 hover:scale-105">
                    <svg
                      viewBox="0 0 24 24"
                      fill="#BDBDBD"
                      height="4em"
                      width="4em"
                      onClick={handleWish}
                      className="icon"
                    >
                      <path d="M5 11h14v2H5z" />
                    </svg>
                    위시 삭제
                  </div>
                )}

                <div className="icon-container flex flex-col items-center hover:text-gray-800 hover:scale-105 ">
                  <svg
                    viewBox="0 0 24 24"
                    fill="#BDBDBD"
                    height="4em"
                    width="4em"
                    className="icon scale-75"
                    onClick={handleReviewShow}
                  >
                    <path d="M14.1 9l.9.9L5.9 19H5v-.9L14.1 9m3.6-6c-.2 0-.5.1-.7.3l-1.8 1.8 3.7 3.8L20.7 7c.4-.4.4-1 0-1.4l-2.3-2.3c-.2-.2-.5-.3-.7-.3m-3.6 3.2L3 17.2V21h3.8l11-11.1-3.7-3.7M7 2v3h3v2H7v3H5V7H2V5h3V2h2z" />
                  </svg>
                  리뷰 남기기
                </div>
              </div>
            </div>
            <hr/>
           
            
            <p>
              1979년 12월 12일, 수도 서울 군사반란 발생 그날, 대한민국의 운명이
              바뀌었다.
              <br />
              <br />
              대한민국을 뒤흔든 10월 26일 이후, 서울에 새로운 바람이 불어온 것도
              잠시 12월 12일, 보안사령관 전두광이 반란을 일으키고 군 내 사조직을
              총동원하여 최전선의 전방부대까지 서울로 불러들인다. 권력에 눈이 먼
              전두광의 반란군과 이에 맞선 수도경비사령관 이태신을 비롯한 진압군
              사이, 일촉즉발의 9시간이 흘러가는데…
              <br />
              <br />
              목숨을 건 두 세력의 팽팽한 대립 오늘 밤, 대한민국 수도에서 가장
              치열한 전쟁이 펼쳐진다!
            </p>
          </div>
        </div>
      </div>
      <div className="mx-28">
        <hr />
        {reviewShow === false ? "" : <Review />}
      </div>
    
      
    </>
  );
}

export default Detail;

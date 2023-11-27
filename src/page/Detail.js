import React, { useEffect, useState, useRef } from "react";
import Review from "../components/Review";

import axios from "axios";
import Star from "../components/Star";
import { useParams } from "react-router-dom";
function Detail() {
  const { name } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  console.log(name);
  const getData = async () => {
    try {
      const url = `http://13.125.242.196/contents/${name}/detail/`;
      const response = await axios.get(url);
      const data = response.data;
      setMovie(data);
      console.log(movie);
      setLoading(false);
      console.log(movie.description.length)
    } catch (err) {
      console.error(err);
    }
  };
 
  useEffect(() => {
    getData();
  }, []);
  const [wish, setWish] = useState(false);
  const handleWish = () => {
    setWish((current) => !current);
  };
  const copyURL = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("현재 링크가 클립보드에 복사되었습니다.");
    } catch (err) {
      console.error("URL 복사에 실패했습니다.", err);
    }
  };
  const backgroundImageUrl = `https://image.tmdb.org/t/p/original/${movie.backgroundimgpath}`;
  const inputForm = useRef(); //특정 DOM을 가리킬 때 사용하는 Hook함수, SecondDiv에 적용
  const onMoveToReview = () => {
    inputForm.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div>
          <div
            className="relative py-80 bg-cover bg-center bg-no-repeat "
            style={{ backgroundImage: `url(${backgroundImageUrl})` , backgroundSize: "cover",  }}
          >
            <div className=" absolute bottom-10 left-44  text-white">
              <h1 className=" text-6xl font-bold pb-3">{movie.name}</h1>
              <div className="pb-2 text-2xl">
                {movie.bigcategory}
                <br />
                {movie.smallcategory}
                <br />
              </div>
            </div>
          </div>
          <div className="flex mx-44 mt-10 mb-10 gap-10 ">
            <div className="w-1/4">
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.imgpath}`}
              />
            </div>
            <div className="w-3/4">
              <div>
                <div className="mb-4 ">
                  <div className="flex justify-between  items-center">
                    <Star AVR_RATE={2.5} />
                    <div className="flex gap-10">
                      {wish === false ? (
                        <div className="item-center  hover:scale-105">
                          <svg
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            height="4em"
                            width="4em"
                            onClick={handleWish}
                            className="scale-90"
                          >
                            <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z" />
                          </svg>
                          <div className="text-center">위시 추가</div>
                        </div>
                      ) : (
                        <div className=" hover:scale-105">
                          <svg
                            fill="#C62A5B"
                            viewBox="0 0 16 16"
                            height="4em"
                            width="4em"
                            onClick={handleWish}
                            className="scale-90"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                            />
                          </svg>
                          <div className="text-center text-my-color ">
                            위시 삭제
                          </div>
                        </div>
                      )}

                      <div className=" flex flex-col items-center  hover:scale-105 ">
                        <svg
                          viewBox="0 0 24 24"
                          fill="#000000"
                          height="4em"
                          width="4em"
                          onClick={onMoveToReview}
                        >
                          <path d="M11 14h2v-3h3V9h-3V6h-2v3H8v2h3z" />
                          <path d="M20 2H4c-1.103 0-2 .897-2 2v18l5.333-4H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14H6.667L4 18V4h16v12z" />
                        </svg>
                        <div className="text-center">리뷰 남기기</div>
                      </div>
                      <div className="hover:scale-105">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                          height="4em"
                          width="4em"
                          className=" scale-90 "
                          onClick={copyURL}
                        >
                          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                        </svg>
                        <div className="text-center">주소 복사</div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="flex">
                  {/* 줄거리 */}
                  <div className="w-3/5 pr-3 border-r border-solid border-gray-300">
                    <h3>줄거리</h3>
                    <p className="mt-2 ">
                      {movie.description && movie.description.length < 300
                        ? movie.description
                        : `${movie.description.slice(0, 300)}...`
                        }
                    </p>
                  </div>
                  {/* 출연진 */}
                  <div className="w-2/5  pl-3">
                    <h3>감독/출연</h3>
                    {/* {Object.entries(movie.actors).map(([actorName, actorImage]) => (
                <div key={actorName}>
                  <p>{actorName}</p>
                  <img
                    src={actorImage}
                    alt={actorName}
                    style={{ width: "100px", height: "150px" }}
                  />
                </div>
              ))} */}
                    <div className="mt-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-44">
            <hr />
            <div ref={inputForm}>
              <Review />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Detail;

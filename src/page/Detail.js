import React, { useEffect, useState, useRef } from "react";
import Review from "../components/Review";
import noImage from "../images/noimage.png";
import noImageBG from "../images/no_img.jpg";
import axios from "axios";
import Star from "../components/Star";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import noImagePs from "../images/noimageps.png";
import Modal from "../components/Modal";
import ViewReview from "../components/ViewReview";
import ApiService from "../api/ApiService";
import dark from "../images/dark.png"
function Detail() {
  const { BASE_URL: URL } = ApiService;
  const { name } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [wish, setWish] = useState(false);
  const [originalWish, setOriginalWish] = useState(false);
  const [showModal, setShowModal] = useState(false);
  console.log(name);
  const getData = async () => {
    try {
      const url = `${URL}contents/${name}/detail/`;
      const response = await axios.get(url);
      const data = response.data;
      console.log(url)
      setMovie(data); // 먼저 movie 상태를 설정
      setWish(data.is_liked);
      setOriginalWish(data.is_liked); // 그 다음에 wish 상태를 설정
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // 페이지 이동을 감지하는 함수
    const handleRouteChange = () => {
      if (wish !== originalWish) {
        console.log("상태가 변경되었습니다. POST 요청을 수행합니다.");
        // 여기에 POST 요청을 수행하는 코드를 추가하세요.
      }
    };

    // 컴포넌트가 언마운트될 때 실행될 반환 함수
    return () => {
      handleRouteChange();
    };
  }, [wish]);

  const handleWish = () => {
    setWish((current) => !current);
    console.log(wish);
  };
  const copyURL = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("현재 링크가 클립보드에 복사되었습니다.");
    } catch (err) {
      console.error("URL 복사에 실패했습니다.", err);
    }
  };

  let backgroundImageUrl = `https://image.tmdb.org/t/p/original/${movie.backgroundimgpath}`;

  if (!loading) {
    if (movie.backgroundimgpath === "/noimage.png") {
      backgroundImageUrl = noImageBG;
    }
  }

  const inputForm = useRef(); //특정 DOM을 가리킬 때 사용하는 Hook함수, SecondDiv에 적용
  const onMoveToReview = () => {
    inputForm.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  console.log(wish);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div
            className="relative py-80 bg-cover bg-center bg-no-repeat "
            style={{
              backgroundImage: `url(${backgroundImageUrl})`,
              backgroundSize: "cover",
            }}
          ><img src={dark} className="absolute bottom-0"></img>
            <div
              className=" absolute bottom-10 left-44  text-white "
              style={{ textShadow: "2px 2px 4px black" }}
            >
              <span className=" text-6xl pb-3">{movie.name}</span>
              <div className="pb-2 text-2xl ">
                {movie.bigcategory}
                <br />
                {movie.smallcategory}
                <br />
                {movie.runningtime}
              </div>
            </div>
          </div>

          <div className="flex mx-44 mt-10 mb-10 gap-10 ">
            <div className="w-1/4">
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.imgpath}`}
                onError={(e) => (e.currentTarget.src = noImage)}
                className=" shadow-xl rounded"
              />
            </div>
            <div className="w-3/4">
              <div>
                <div className="mb-4 ">
                  <div className="flex justify-between  items-center">
                    <Star AVR_RATE={2.5} />
                    <div className="flex gap-3">
                      {wish === false ? (
                        <div className="flex flex-col items-center  hover:scale-105">
                          <svg
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            height="2.5em"
                            width="2.5em"
                            onClick={handleWish}
                            className="scale-90"
                          >
                            <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z" />
                          </svg>
                          <div className="text-center">위시 추가</div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center hover:scale-105">
                          <svg
                            fill="#C62A5B"
                            viewBox="0 0 16 16"
                            height="2.5em"
                            width="2.5em"
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
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          onClick={onMoveToReview}
                          height="2.5em"
                          width="2.5em"
                        >
                          <path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                        </svg>

                        <div className="text-center">리뷰 남기기</div>
                      </div>
                      <div className="flex flex-col items-center hover:scale-105">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.75}
                          viewBox="0 0 24 24"
                          height="2.5em"
                          width="2.5em"
                          className=" scale-95 "
                          onClick={copyURL}
                        >
                          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                        </svg>
                        <div className="text-center">주소 복사</div>
                      </div>
                      <div className="flex flex-col items-center hover:scale-105">
                        <svg
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          height="2.5em"
                          width="2.5em"
                          onClick={() => setShowModal(true)}
                        >
                          <path d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                        <div className="text-center">예고편 보기</div>
                      </div>
                    </div>
                  </div>
                  <Modal showModal={showModal} setShowModal={setShowModal} />
                </div>
                <hr />
                <div className="flex">
                  {/* 줄거리 */}
                  <div className="w-3/5 pr-3 border-r border-solid border-gray-300">
                    <h3>줄거리</h3>
                    <p className="mt-2 ">
                      {movie.description && movie.description.length < 300
                        ? movie.description
                        : `${movie.description.slice(0, 300)}...`}
                    </p>
                  </div>
                  {/* 출연진 */}
                  <div className="w-2/5  pl-3">
                    <div className="mb-2">
                      <h3>감독</h3>
                      {movie.director}
                    </div>

                    <h3>출연</h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.actors.map((item) => (
                        <div className="w-[23%] flex flex-col items-center rounded shadow-md">
                          <img
                            src={`https://image.tmdb.org/t/p/original/${item.image}`}
                            className=" rounded-t"
                            onError={(e) => (e.currentTarget.src = noImagePs)}
                          />
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-44">
            <hr />
            <div ref={inputForm}>
              <Review />
              <ViewReview name={name} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Detail;

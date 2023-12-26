import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Button from "../components/Button";
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";

function ShortFilm2() {
  const [index, setIndex] = useState(0);
  const [isPlayed, setIsPlayed] = useState(true);
  const [volume, setVolume] = useState("0");
  const shortFilmIdArr = [
    {
      id: 0,
      vodname: "이게 진짜 파도타기지💙🌊 #엘리멘탈 #shortfilm",
      url: 2289,
    },
    {
      id: 1,
      vodname: "스토브리그 봤어요~?⚾ 기습질문 #천원짜리변호사",
      url: 1234,
    },
    { id: 2, vodname: "제철장터 🍎🦀🍗 #산지직송", url: 0 },
    {
      id: 3,
      vodname:
        "크리스마스에 해리한테 인사받는 법🎄 #24일23시3분21초 #해리포터마법사의돌",
      url: 2226,
    },
    {
      id: 4,
      vodname: "중국에서 펜트하우스를 만든다면? #펜트하우스 #천서진!!!",
      url: 3892,
    },
    {
      id: 5,
      vodname: "담당 작가에게 일어난 기이한 현상😱 #심야괴담회 #230718방송",
      url: 143,
    },
    {
      id: 6,
      vodname:
        "장윤정도 모르는 장윤정이 부른 노래 ㅋㅋ #장윤정 #장윤정의도장깨기",
      url: 4170,
    },
    { id: 7, vodname: "그루트 춤추는 장면🌳 #아임그루트 #가오갤2", url: 3439 },
    {
      id: 8,
      vodname: "범죄도시2 손석구가 납치한 진짜이유 #범죄도시2 #추앙해",
      url: 723,
    },
    {
      id: 9,
      vodname: "우리의 영원한 아기 판다 푸바오🐼와 강철원 사육사 #TV동물농장",
      url: 3,
    },
  ];
  const reduceIndex = (prev) => {
    if (prev > 0) {
      setIndex((prev) => prev - 1);
    } else {
      setIndex(9);
    }
  };

  const increaseIndex = (prev) => {
    if (prev > 8) {
      setIndex(0);
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setIsPlayed(true);
  }, [index]);

  return (
    <>
      <div className="flex flex-col mx-28  items-center">
        <div className="flex justify-center">
        <Button
          className={"text-white text-6xl"}
          icon={<MdChevronLeft />}
          onClick={() => {
            reduceIndex(index);
          }}
        />
        <div className="flex flex-col text-white items-center w-full h-full">
          <ReactPlayer
            url={`https://rvdshortvideo.s3.ap-northeast-2.amazonaws.com/sv${index}.mp4`}
            volume={volume}
            loop={true}
            width="80%"
            height="80%"
            playing={isPlayed}
            onClick={() => {
              setIsPlayed((current) => !current);
            }}
            autoplay
          />
           <div className="flex justify-between w-[80%] items-center">
           <p className="mb-0 text-3xl">
        {shortFilmIdArr[index].vodname}  
        </p>
        {volume === "1" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#FFFFFF"
            data-slot="icon"
            height="2em"
            width="2em"
            onClick={() => {
              setVolume("0");
            }}
            className=" cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#FFFFFF"
            data-slot="icon"
            height="2em"
            width="2em"
            onClick={() => {
              setVolume("1");
            }}
            className=" cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
            />
          </svg>
        )}
        </div>
        </div>
        <Button
          className={"text-white text-6xl"}
          icon={<MdChevronRight />}
          onClick={() => {
            increaseIndex(index);
          }}
        />
        </div>
      </div>
    </>
  );
}

export default ShortFilm2;

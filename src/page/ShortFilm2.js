import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Button from "../components/Button";
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";

function ShortFilm2() {
  const [index, setIndex] = useState(0);
  const [isPlayed, setIsPlayed] = useState(true);
  const [volume, setVolume] = useState("0");
  const shortFilmIdArr = [
    {
      id: 2289,
      vodname: "이게 진짜 파도타기지💙🌊 #엘리멘탈 #shortfilm",
      url: "2d6bf5d2-0de1-4844-9471-e4d469319f11",
    },
    {
      id: 1234,
      vodname: "스토브리그 봤어요~?⚾ 기습질문 #천원짜리변호사",
      url: "4875be0d-5c3d-4a62-a4be-936e5670309b",
    },
    { id: 0, vodname: "제철장터 🍎🦀🍗 #산지직송", url: 0 },
  ];
  const reduceIndex = (prev) => {
    if (prev > 0) {
      setIndex((prev) => prev - 1);
    } else {
      setIndex(2);
    }
  };

  const increaseIndex = (prev) => {
    if (prev > 1) {
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
              url={`https://github.com/jason980713/video/assets/142579121/${shortFilmIdArr[index].url}`}
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
            <div className="flex justify-between w-[80%] ">
              <p className="mb-0 text-3xl">
                {shortFilmIdArr[index].id === 0 ? (
                  <a
                    href="https://seasonmarket.co.kr/"
                    className="no-underline text-[8px] text-gray-100 text-center "
                  >
                    <p className="text-[24px] text-center my-3">
                      {shortFilmIdArr[index].vodname}
                    </p>
                  </a>
                ) : (
                  <Link
                    to={`/detail/${shortFilmIdArr[index].id}`}
                    className="no-underline text-gray-100 text-center"
                  >
                    <p className="text-[24px] text-center mt-1 mb-4">
                      {shortFilmIdArr[index].vodname}
                    </p>
                  </Link>
                )}
              </p>
              {volume === "1" ? (
                <div className="mt-1 mb-4">
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
                </div>
              ) : (
                <div className="mt-1 mb-4">
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
                </div>
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

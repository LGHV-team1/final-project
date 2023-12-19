import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

function Streaming({ id, titleimg }) {
  const [volume, setVolume] = useState("0");

  return (
    <>
      <div className="relative w-full pt-[57%] bottom-20" >
        <div className="absolute top-0 left-0 w-full h-full z-10">
          <ReactPlayer
            width="100%"
            height="100%"
            url={`https://rvdshortvideo.s3.ap-northeast-2.amazonaws.com/sv${id}.mp4`}
            playing={true}
            volume={volume}
            loop={true}
          />

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                "linear-gradient(to bottom, rgba(0,0,0,0), rgba(21,21,21,1))",
            }}
          ></div>
          <div className="relative flex gap-6 items-center bottom-[500px]  z-20   left-28">
            <img className="xl:h-[135px] xl:w-[350px] lg:h-[90px] lg:w-[210px] md:w-[210px] sm:h-[90px] " src={titleimg}></img>
            {volume === "1" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#FFFFFF"
                data-slot="icon"
                height="3em"
                width="3em"
                onClick={() => {
                  setVolume("0");
                }}
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
                height="3em"
                width="3em"
                onClick={() => {
                  setVolume("1");
                }}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                />
              </svg>
            )}
            <Link to={`/detail/${id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#FFFFFF"
                data-slot="icon"
                height="3em"
                width="3em"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Streaming;

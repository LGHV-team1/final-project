import React, { useState } from "react";
import Top5 from "../components/Top5";
import mainimg1 from "../images/MainTop/top1연인.jpg";
import mainimg2 from "../images/MainTop/top2범죄도시.jpg";
import mainimg3 from "../images/MainTop/top3런닝맨.jpg";
import mainimg4 from "../images/MainTop/top4꼬꼬무.jpg";
import mainimg5 from "../images/MainTop/top5최강배달꾼.jpg";
import ShowRec from "../components/ShowRec";
import Streaming from "../components/Streaming";

function Home() {
  const [id, setId] = useState(1);
  const bgArr = [
    { id: 2288, img: mainimg1, vodname: "엘리멘탈" },
    { id: 4138, img: mainimg2, vodname: "아바타2" },
    { id: 2865, img: mainimg3, vodname: "밀수" },
    { id: 1156, img: mainimg4, vodname: "소방서 옆 경찰서 그리고 국과수" },
    { id: 2350, img: mainimg5, vodname: "가디언즈 오브 갤럭시3" },
  ];
  return (
    <>
      <div className="relative bottom-24">
        <Streaming id={4138} />
        <div className="relative bottom-[320px] z-20 mx-28 text-white  ">
          <Top5 id={id}images={bgArr} />
          <div className="relative top-10 flex flex-wrap justify-between">
            {/* <img
              className=" cursor-pointer"
              onClick={() => {
                setId(4);
              }}
              src={mainimg1}
              width={"30%"}
            ></img>
            <img
              className=" cursor-pointer"
              onClick={() => {
                setId(3);
              }}
              src={mainimg4}
              width={"30%"}
            ></img>
            <img
              className=" cursor-pointer"
              onClick={() => {
                setId(1);
              }}
              src={mainimg2}
              width={"30%"}
            ></img> */}
           
          </div>
        </div>
      </div>
      <div className="relative mx-28 bottom-28 text-gray-300 font-bold z-10">
        <p className=" text-3xl">💕 당신이 좋아할만한 컨텐츠 💕</p>
        <ShowRec algorithmNum={1} />
        <p className=" text-3xl">📺 당신이 주로 본 장르 📺</p>
        <ShowRec algorithmNum={2} />
        <p className=" text-3xl">🎥 이런 컨텐츠 어때요? 🎥</p>
        <ShowRec algorithmNum={"otheruser"} />
        <p className=" text-3xl">🕐 지금 시간에 인기 있는 컨텐츠 🕐</p>
        <ShowRec algorithmNum={3} />
        <p className=" text-3xl">🎄 크리스마스 시즌 🎄</p>
        <ShowRec algorithmNum={6} />
        <p className=" text-3xl">👀 당신의 찜목록을 훔쳐봤어~ 👀</p>
        <ShowRec algorithmNum={7} />
      </div>
    </>
  );
}
{
  /* const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
} */
}
export default Home;

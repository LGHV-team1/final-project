import React, { useState } from "react";
import Top5 from "../components/Top5";
import ShowRec from "../components/ShowRec";

function Home() {
  return (
    <>
      <Top5  />
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

import React from "react";
import Top5 from "../components/Top5";
import mainimg1 from "../images/MainTop/top1연인.jpg";
import mainimg2 from "../images/MainTop/top2범죄도시.jpg";
import mainimg3 from "../images/MainTop/top3런닝맨.jpg";
import mainimg4 from "../images/MainTop/top4꼬꼬무.jpg";
import mainimg5 from "../images/MainTop/top5최강배달꾼.jpg";
import ShowRec from "../components/ShowRec";
function Home() {
  const bgArr = [
    { id: 1166, img: mainimg1, vodname: "연인" },
    { id: 2537, img: mainimg2, vodname: "범죄도시3" },
    { id: 296, img: mainimg3, vodname: "런닝맨" },
    { id: 8, img: mainimg4, vodname: "꼬리에 꼬리를 무는 그날 이야기" },
    { id: 754, img: mainimg5, vodname: "최강 배달꾼" },
  ];
  return (
    <div className="mx-28 mt-5 text-gray-300 font-bold">
      <div className="mb-20">
        <div className="mt-3">
          <p className=" text-3xl my-5">⭐인기 Top5⭐</p>
          <Top5 images={bgArr} />
        </div>
      </div>
      <p className=" text-3xl">알고리즘 1번 추천</p>
      <ShowRec algorithmNum={1} />
      <p className=" text-3xl">알고리즘 2번 추천</p>
      <ShowRec algorithmNum={2} />
      <p className=" text-3xl">다른 유저의 추천 목록을 보여드립니다~🤔</p>
      <ShowRec algorithmNum={"otheruser"} />
    </div>
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

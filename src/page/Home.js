import React, { useEffect, useState } from "react";
import Top5 from "../components/Top5";
import ShowRec from "../components/ShowRec";
import ApiService from "../api/ApiService";
import Spinner from "../components/Spinner";
function Home() {
  const [userInfo, setUserInfo] = useState({ stbnumber: null });
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await ApiService.getUserInfo();
      const data = response.data;
      setUserInfo(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        <Top5 />
        <div className="relative mx-28 text-gray-300 font-bold z-10">
          {userInfo.stbnumber === 0 ? (
            <>
              <ShowRec className={"relative bottom-80"}label={"💕 환영해요 뉴비 💕"} algorithmNum={5} />
              <ShowRec className={"relative bottom-[272px]"} label={"🍺 새로 온 당신을 위하여 🍺"} algorithmNum={4} />
              <ShowRec className={"relative bottom-56"} label={"🍺 임시 뭐라도 넣어야 해요 🍺"} algorithmNum={4} />
            </>
          ) : (
            <>
              <ShowRec
              className={"relative bottom-80"}
                label={"💕 당신이 좋아할만한 컨텐츠 💕"}
                algorithmNum={1}
              />
              <ShowRec 
              className={"relative bottom-[272px]"}
              label={"📺 당신이 주로 본 장르 📺"} algorithmNum={2} />
              <ShowRec
              className={"relative bottom-56"}
                label={"🎥 이런 컨텐츠 어때요? 🎥"}
                algorithmNum={"otheruser"}
              />
            </>
          )}
            <ShowRec
            className={"relative bottom-44"}
              label={"🕐 지금 시간에 인기 있는 컨텐츠 🕐"}
              algorithmNum={3}
            />
            <ShowRec className={"relative bottom-32"} label={"🎄 크리스마스 시즌 🎄"} algorithmNum={6} />
            <ShowRec
            className={"relative bottom-[88px]"}
              label={"👀 당신의 찜목록을 훔쳐봤어~ 👀"}
              algorithmNum={7}
            />
        </div>
      </>
    );
  }
}

export default Home;

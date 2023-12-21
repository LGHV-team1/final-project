import React, { useEffect, useState } from "react";
import Top5 from "../components/Top5";
import ShowRec from "../components/ShowRec";
import ApiService from "../api/ApiService";
import Spinner from "../components/Spinner";
function Home() {
  const [userInfo, setUserInfo] = useState({ stbnumber: null });
  const [loading, setLoading] = useState(true);
  const [watchedData, setWatchedData] = useState([]);
  const handleWatchedData = (data) => {
    setWatchedData(data);
  };
  const [watchedLabel, setWatchedLabel] = useState("📺 당신이 관심가진 것과 비슷한 컨텐츠 📺");

  // watched 데이터가 변경될 때 레이블 업데이트
  useEffect(() => {
    if (watchedData.length > 0) {
      // 예를 들어 첫 번째 아이템의 이름을 사용
      setWatchedLabel(`📺 당신이 관심가진 <${watchedData[0].name}> 비슷한 컨텐츠 📺`);
    }
  }, [watchedData]);
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
              <ShowRec className={"relative bottom-80"}label={"💕 환영해요 뉴비 💕"} algorithmNum={4} />
              <ShowRec className={"relative bottom-[272px]"} label={"🍺 새로 온 당신을 위하여 🍺"} algorithmNum={5} />
              <ShowRec className={"relative bottom-56"} label={"🍺 인기 TOP 10 🍺"} algorithmNum={6} />
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
              label={watchedLabel} 
              algorithmNum={2} onWatchedData={handleWatchedData} />
              <ShowRec
              className={"relative bottom-56"}
                label={"🎥 이런 컨텐츠 어때요? 🎥"}
                algorithmNum={3}
              />
            </>
          )}
            <ShowRec
            className={"relative bottom-44"}
              label={"🕐 지금 시간에 인기 있는 컨텐츠 🕐"}
              algorithmNum={7}
            />
            <ShowRec className={"relative bottom-32"} label={"🎄 크리스마스 시즌 🎄"} algorithmNum={8} />
            <ShowRec
            className={"relative bottom-[88px]"}
              label={"👀 당신의 위시리스트를 훔쳐봤어요 👀"}
              algorithmNum={9}
            />
        </div>
      </>
    );
  }
}

export default Home;

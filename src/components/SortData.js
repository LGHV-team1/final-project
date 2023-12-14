import React, { useEffect, useState } from "react";
import ShowData from "./ShowData";
import Button from "./Button";
import { useSelector } from "react-redux";
function SortData({ data }) {
  const [vodData, setVodData] = useState([]);
  const [visiblevodData, setVisiblevodData] = useState([]);
  const itemsPerpage = 24;
  const [order, setOrder] = useState("");
  const [isShow, setIsShow] = useState(true);
  const detailCategory = useSelector((state) => state.category.value);
  useEffect(() => {
    setVodData(data);
    setVisiblevodData(data.slice(0, itemsPerpage));
  }, [data]);

  useEffect(() => {
    // detailCategory가 변경될 때마다 상태를 업데이트
    setVodData((prevData) => {
      let updatedVodData;

      if (order === "random") {
        updatedVodData = shuffleArray(prevData);
      } else {
        updatedVodData = sortedData(prevData, order);
      }

      setVisiblevodData(updatedVodData.slice(0, itemsPerpage));

      return prevData;
    });
  }, [order, detailCategory]);

  useEffect(() => {
    // 남은 데이터가 없을 경우 isShow를 false로 설정
    if ((vodData.length - visiblevodData.length) <= 0) {
      setIsShow(false);
    } else {
      setIsShow(true);
    }
  }, [visiblevodData, vodData]);
  
  const sortedData = (data, order) => {
    if (
      !order ||
      order === "random" ||
      (order !== "name" && order !== "count")
    ) {
      return [...data];
    }

    return [...data].sort((a, b) => {
      if (order === "name") {
        return a.name.localeCompare(b.name);
      } else if (order === "count") {
        return b.count - a.count;
      }
    });
  };

  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleRandomdata = (newOrder) => {
    if (newOrder === "random") {
      const shuffledvodData = shuffleArray(vodData);
      setOrder(newOrder);
      setVisiblevodData(shuffledvodData.slice(0, itemsPerpage));
    } else {
      setOrder(newOrder);
    }
  };

  // const handleShowMorevodData = () => {
  //   const remainingDataLength = vodData.length - visiblevodData.length;

  //   if (remainingDataLength <= itemsPerpage) {
  //     setIsShow(false);
  //   } else {
  //     const newDataToShow = vodData.slice(
  //       visiblevodData.length,
  //       visiblevodData.length + itemsPerpage
  //     );
  //     setVisiblevodData([...visiblevodData, ...newDataToShow]);
  //   }
  // };

  const handleShowMorevodData = () => {
    const newDataToShow = vodData.slice(
      visiblevodData.length,
      visiblevodData.length + itemsPerpage
    );
  
    setVisiblevodData(prev => [...prev, ...newDataToShow]);
  };

  console.log(visiblevodData.length);
  console.log(vodData.length);
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-gray-300">
          <h1 className="my-5">{detailCategory}</h1>
        </div>

        <div className="flex ">
          <Button onClick={() => handleRandomdata("name")} label={"이름순"} />
          <Button onClick={() => handleRandomdata("count")} label={"인기순"} />
          <Button onClick={() => handleRandomdata("random")} label={"랜덤"} />
        </div>
      </div>
      <div>
        <ShowData
          data={visiblevodData}
          handleShow={handleShowMorevodData}
          isShow={isShow}
        />
      </div>
    </>
  );
}

export default SortData;

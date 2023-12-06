import React, { useEffect, useState } from "react";
import ShowData from "./ShowData";
import Button from "./Button";
import { useSelector } from "react-redux";
function SortData({ data }) {
  const [vodData, setVodData] = useState([]);
  const [visiblevodData, setVisiblevodData] = useState([]);
  const itemsPerpage = 20;
  const [order, setOrder] = useState("");
  const detailCategory = useSelector((state) => state.category.value);
  console.log(data);
  useEffect(() => {
    // Redux 스토어에서 데이터를 가져와서 컴포넌트의 상태를 초기화
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

  const handleShowMorevodData = () => {
    const newDataToShow = vodData.slice(
      visiblevodData.length,
      visiblevodData.length + itemsPerpage
    );
    setVisiblevodData([...visiblevodData, ...newDataToShow]);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
        <h1>{detailCategory}</h1>
        </div>
        
        <div className="flex ">
          <Button onClick={() => handleRandomdata("name")} label={"이름순"} />
          <Button onClick={() => handleRandomdata("count")} label={"인기순"} />
          <Button onClick={() => handleRandomdata("random")} label={"랜덤"} />
        </div>
      </div>
      <div>
        <ShowData data={visiblevodData} handleShow={handleShowMorevodData} />
      </div>
    </>
  );
}

export default SortData;

import React, { useState } from "react";
import ApiService from "../api/ApiService";
import { useEffect } from "react";
import RecMiniSlide from "./RecMiniSlide";

function ShowRec({ className,label, algorithmNum, onWatchedData }) {
  const [vodData, setvodData] = useState([]);
  const getData = async () => {
    try {
      const response = await ApiService.getRec(algorithmNum);
      const data = response.data;
      if (algorithmNum === 2) {
        onWatchedData(data.watched);
        setvodData(data.recommend);
      }
      //console.log(`알고리즘번호${algorithmNum}: ${data}`);
      else {
        setvodData(data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={className}>
      <p className=" text-3xl">{label}</p>
      <RecMiniSlide data={vodData} />
    </div>
  );
}

export default ShowRec;

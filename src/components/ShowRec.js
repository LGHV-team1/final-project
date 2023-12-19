import React, { useState } from "react";
import ApiService from "../api/ApiService";
import { useEffect } from "react";
import RecMiniSlide from "./RecMiniSlide";

function ShowRec({ className,label, algorithmNum }) {
  const [vodData, setvodData] = useState([]);
  const [loading, setLoading] = useState(false)
  const getData = async () => {
    try {
      const response = await ApiService.getRec(algorithmNum);
      const data = response.data;
      console.log(`알고리즘번호${algorithmNum}: ${data}`);
      setvodData(data);
      setLoading(false)
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

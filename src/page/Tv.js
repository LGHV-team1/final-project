import React, { useState, useEffect } from "react";
import MiniSlide from "../components/MiniSlide";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import ApiService from "../api/ApiService";
import SortData from "../components/SortData";

function Tv() {
  const { BASE_URL: URL } = ApiService;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryWord = searchParams.get("category");
  const [tv, setTv] = useState([]);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    try {
      let response;
      if (categoryWord === null) {
        response = await ApiService.getTv1(); // getKids1 메서드 호출
      } else {
        response = await ApiService.getTv2(categoryWord); // getKids2 메서드에 categoryWord 전달
      }
    
      const data = response.data;
      console.log(data);
      setTv(data);
      setLoading(false)
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, [categoryWord]);

  
  if (categoryWord === null) {
    return (
      <div className=" mx-28 ">
        <div className="">
          <div className="">
          <p className=" text-4xl text-gray-300 my-5">⭐Tv Top10⭐</p>
            <MiniSlide data={tv} />
          </div>
          <div className="text-center mt-3"></div>
        </div>
      
      </div>
    );
  } else {
    return (
      <div className="mx-28">
        {loading === true ? <div>loading</div> : <SortData data={tv} />}
      </div>
    );
  }
}

export default Tv;

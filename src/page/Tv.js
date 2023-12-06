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
    let url;
    if (categoryWord === null) {
      url = `${URL}contents/category/tv/`; // url에 값을 할당
    } else {
      url = `${URL}contents/category/tv/${categoryWord}`; // url에 값을 할당
    }
    try {
      const response = await axios.get(url);
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
      <div className=" mx-44  ">
        <div className="">
          <div className="">
          <h1 className="my-10">TV 인기 TOP5</h1>
            <MiniSlide data={tv} />
          </div>
          <div className="text-center mt-3"></div>
        </div>
      
      </div>
    );
  } else {
    return (
      <div className="mx-44">
        {loading === true ? <div>loading</div> : <SortData data={tv} />}
      </div>
    );
  }
}

export default Tv;

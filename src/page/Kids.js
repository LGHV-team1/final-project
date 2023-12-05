import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import MiniSlide from "../components/MiniSlide";
import ApiService from "../api/ApiService";
import SortData from "../components/SortData";
function Kids() {
  const { BASE_URL: URL } = ApiService;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryWord = searchParams.get("category");
  const [loading, setLoading] = useState(true);
  const [kids, setKids] = useState([]);
  const getData = async () => {
    let url;
    if (categoryWord === null) {
      url = `${URL}contents/category/kids/`; // url에 값을 할당
    } else {
      url = `${URL}contents/category/kids/${categoryWord}`; // url에 값을 할당
    }
    try {
      const response = await axios.get(url);
      const data = response.data;
      console.log(data);
      setKids(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, [categoryWord]); // 카테고리가 변경될 때만 데이터를 가져오기

  if (categoryWord === null) {
    return (
      <div className=" mx-44  ">
        <div className="">
          <div className="">
            <h1 className="my-10">영화 인기 TOP5</h1>
            <MiniSlide data={kids} />
          </div>
          <div className="text-center mt-3"></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mx-44">
        {loading === true ? <div>loading</div> : <SortData data={kids} />}
      </div>
    );
  }
}

export default Kids;

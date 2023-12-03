import React, { useState, useEffect } from "react";
import MiniSlide from "../components/MiniSlide";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import ApiService from "../api/ApiService";
import ShowData from "../components/ShowData";
function Tv() {
  const { BASE_URL: URL } = ApiService;
  const detailcategory = useSelector((state) => state.category.value);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryWord = searchParams.get("category");
  const [tv, setTv] = useState([]);
  const [visibleTv, setVisibleTv] = useState([]);
  const itemsPerpage = 20;
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
      setVisibleTv(data.slice(0, itemsPerpage));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, [categoryWord]);

  const handleShowMoreTv = () => {
    const newDataToShow = tv.slice(
      visibleTv.length,
      visibleTv.length + itemsPerpage
    );
    setVisibleTv([...visibleTv, ...newDataToShow]);
  };

  if (categoryWord === null) {
    return (
      <div className=" mx-44  ">
        <div className="">
          <div className="">
            <p>TV 인기 TOP5</p>
            <MiniSlide data={tv} />
          </div>
          <div className="text-center mt-3"></div>
        </div>
      </div>
    );
  } else {
    return <ShowData data={visibleTv} handleShow={handleShowMoreTv} />;
  }
}

export default Tv;

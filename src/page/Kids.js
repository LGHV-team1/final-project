import React, { useEffect, useState } from "react";
import { useParams, useLocation, } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import MiniSlide from "../components/MiniSlide";
import ApiService from "../api/ApiService";
import ShowData from "../components/ShowData";
function Kids() {
  const { BASE_URL: URL } = ApiService;
  const [loading, setLoading] = useState(true);
  const detailcategory = useSelector((state) => state.category.value);
  const { category } = useParams();
  console.log(detailcategory);
  console.log(category);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryWord = searchParams.get("category");
  const [kids, setKids] = useState([]);
  const [visibleKids, setVisibleKids] = useState([]);
  const itemsPerpage = 20;

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
      setVisibleKids(data.slice(0, itemsPerpage));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, [categoryWord]);

  const handleShowMoreKids = () => {
    const newDataToShow = kids.slice(
      visibleKids.length,
      visibleKids.length + itemsPerpage
    );
    setVisibleKids([...visibleKids, ...newDataToShow]);
  };

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
      <ShowData data={visibleKids} handleShow={handleShowMoreKids} />
    );
  }
}

export default Kids;

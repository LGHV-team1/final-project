import React, { useState, useEffect } from "react";
import MiniSlide from "../components/MiniSlide";
import { useLocation } from "react-router-dom";
import ApiService from "../api/ApiService";
import SortData from "../components/SortData";
import CategoryBtn from "../components/CategoryBtn";
function Tv() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryWord = searchParams.get("category");
  const bigcategory = "tv"
  const [tv, setTv] = useState([]);
  const [loading, setLoading] = useState(true);
  const [TvCategory, setTvCategory] = useState([]);
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

  useEffect(() => {
    ApiService.getCategory(bigcategory)
    .then((response) => {
      const flattenedList = [].concat.apply([], response.data);
      setTvCategory(flattenedList)
      console.log(flattenedList)
    })
  }, []);
  function handleCategoryChange(category) {
    searchParams.set("category", category);
    // URL을 변경하는 로직이 필요하면 여기에 추가합니다.
  }
  if (categoryWord === null) {
    return (
      <div className=" mx-28">
        <div className="">
          <div className="">
          <p className=" text-4xl text-gray-300 my-5">⭐Tv Top10⭐</p>
            <MiniSlide data={tv} />
          </div>
          <div className="mt-3">
          <p className=" text-3xl text-gray-300 my-5">👀 카테고리를 골라보세요 👀</p>
            <CategoryBtn data={TvCategory} bigcategory={bigcategory}/>
          </div>
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

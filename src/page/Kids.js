import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MiniSlide from "../components/MiniSlide";
import ApiService from "../api/ApiService";
import SortData from "../components/SortData";
import CategoryBtn from "../components/CategoryBtn";
function Kids() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryWord = searchParams.get("category");
  const bigcategory = "kids"
  const [loading, setLoading] = useState(true);
  const [kids, setKids] = useState([]);
  const [kidsCategory, setKidsCategory] = useState([]);
  const getData = async () => {
    try {
      let response;
        if (categoryWord === null) {
          response = await ApiService.getKids1(); // getKids1 메서드 호출
        } else {
          response = await ApiService.getKids2(categoryWord); // getKids2 메서드에 categoryWord 전달
        }
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

  useEffect(() => {
    ApiService.getCategory(bigcategory)
    .then((response) => {
      const flattenedList = [].concat.apply([], response.data);
      setKidsCategory(flattenedList)
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
          <p className=" text-3xl text-gray-300 my-5">⭐키즈 Top10⭐</p>
            <MiniSlide data={kids} />
          </div>
        </div>
        <div className="mt-3">
        <p className=" text-3xl text-gray-300 my-5">☝ 카테고리를 골라보세요 ☝</p>
            <CategoryBtn data={kidsCategory} bigcategory={bigcategory}/>
          </div>
      </div>
    );
  } else {
    return (
      <div className="mx-28">
        {loading === true ? <div>loading</div> : <SortData data={kids} />}
      </div>
    );
  }
}

export default Kids;

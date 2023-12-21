import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MiniSlide from "../components/MiniSlide";
import ApiService from "../api/ApiService";
import SortData from "../components/SortData";
import CategoryBtn from "../components/CategoryBtn";
function Movie() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryWord = searchParams.get("category");
  const bigcategory = "movie"
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [MovieCategory, setMovieCategory] = useState([]);
  const getData = async () => {

    try {
      let response;
      if (categoryWord === null) {
        response = await ApiService.getMovie1(); // getKids1 메서드 호출
      } else {
        response = await ApiService.getMovie2(categoryWord); // getKids2 메서드에 categoryWord 전달
      }
      const data = response.data;
      console.log(data);
      setMovie(data);
      setLoading(false);
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
      setMovieCategory(flattenedList)
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
          <p className=" text-3xl text-gray-300 my-5">⭐영화 Top10⭐</p>
            <MiniSlide data={movie} />
          </div>
          <div className="text-center mt-3"></div>
        </div>
        <div className="mt-3">
        <p className=" text-3xl text-gray-300 my-5">☝ 카테고리를 골라보세요 ☝</p>
            <CategoryBtn data={MovieCategory} bigcategory={bigcategory}/>
          </div>
      </div>
    );
  } else {
    return (
      <div className="mx-28">
        {loading === true ? <div>loading</div> : <SortData data={movie} />}
      </div>
    );
  }
}

export default Movie;

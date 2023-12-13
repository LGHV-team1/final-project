import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MiniSlide from "../components/MiniSlide";
import ApiService from "../api/ApiService";
import SortData from "../components/SortData";
function Movie() {
  const { BASE_URL: URL } = ApiService;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryWord = searchParams.get("category");
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if (categoryWord === null) {
    return (
      <div className=" mx-28  ">
        <div className="">
          <div className="">
          <p className=" text-4xl text-gray-300 my-5">⭐영화 Top5⭐</p>
            <MiniSlide data={movie} />
          </div>
          <div className="text-center mt-3"></div>
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

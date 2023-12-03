import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MiniSlide from "../components/MiniSlide";
import ApiService from "../api/ApiService";
import { useSelector } from "react-redux";
import ShowData from "../components/ShowData";
function Movie() {
  const { BASE_URL: URL } = ApiService;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryWord = searchParams.get("category");
  const [movie, setMovie] = useState([]);
  const [visibleMovie, setVisibleMovie] = useState([]);
  const itemsPerpage = 20;
  const detailcategory = useSelector((state) => state.category.value);
  const getData = async () => {
    let url;
    if (categoryWord === null) {
      url = `${URL}contents/category/movie/`; // url에 값을 할당
    } else {
      url = `${URL}contents/category/movie/${categoryWord}`; // url에 값을 할당
    }
    try {
      const response = await axios.get(url);
      const data = response.data;
      console.log(data);
      setMovie(data);
      setVisibleMovie(data.slice(0, itemsPerpage));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, [categoryWord]);

  const handleShowMoreMovie = () => {
    const newDataToShow = movie.slice(
      visibleMovie.length,
      visibleMovie.length + itemsPerpage
    );
    setVisibleMovie([...visibleMovie, ...newDataToShow]);
  };

  if (categoryWord === null) {
    return (
      <div className=" mx-44  ">
        <div className="">
          <div className="">
            <h1 className="my-10">영화 인기 TOP5</h1>
            <MiniSlide data={movie} />
          </div>
          <div className="text-center mt-3"></div>
        </div>
      </div>
    );
  } else {
    return <ShowData data={visibleMovie} handleShow={handleShowMoreMovie} />;
  }
}

export default Movie;

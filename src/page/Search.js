import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import noImage from "../images/noimage.png";
import Helload from "../components/Helload";
import ApiService from '../api/ApiService';

const isChoseongOnly = (string) => {
  return /^[ㄱ-ㅎ]+$/g.test(string);
};

function Search() {
  const {BASE_URL: URL} = ApiService;
  const searchValue = useSelector((state) => state.search.value);

  const [movies, setMovie] = useState([]);
  useEffect(() => {
    if (searchValue) {
      getData();
    }
  }, [searchValue]);

  const getData = async () => {
    try {
      const url = isChoseongOnly(searchValue)
        ? `${URL}contents/search/${searchValue}`
        : `${URL}contents/${searchValue}`;
      //const url = `http://13.125.242.196/contents/${searchValue}`;
      const response = await axios.get(url);
      const data = response.data;
      setMovie(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  if (searchValue === "") {
    return (
      <div className="mx-44 mt-5">
        <h1>검색어를 입력해주세요</h1>
        <Helload />
      </div>
    );
  } else {
    return (
      <div className="mx-44 mt-5">
        <h1>
          검색 결과: {searchValue}
          <div className="flex flex-wrap gap-4 my-5">
            {movies.map((movie, index) => (
              <div
                key={index}
                className="w-[18.5%]  sm:w-1/2 md:w-1/2 lg:w-[18.5%] xl:w-[18.5%] mb-5 transition transform duration-500 ease-in-out hover:scale-105"
                              >
                <Link to={`/detail/${movie.id}`} className="">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.imgpath}`}
                    className=" rounded-md w-full shadow-[0px_0px_1px_3px_rgba(0,0,0,0.3)]"
                    onError={(e) => (e.currentTarget.src = noImage)}
                    style={{ height: "400px" }}
                    />
                </Link>
                <div className="text-gray-600 text-[18px]">{movie.name}</div>
              </div>
            ))}
          </div>
        </h1>
      </div>
    );
  }
}

export default Search;

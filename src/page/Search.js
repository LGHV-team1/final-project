import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import noImage from "../images/noimage.png";
import Helload from "../components/Helload";
import ApiService from "../api/ApiService";

const isChoseongOnly = (string) => {
  return /^[ㄱ-ㅎ]+$/g.test(string);
};

function Search() {
  const searchValue = useSelector((state) => state.search.value);

  const [movies, setMovie] = useState([]);
  useEffect(() => {
    if (searchValue) {
      getData();
    }
  }, [searchValue]);

  const getData = async () => {
    try {
      let response;
      if (isChoseongOnly(searchValue)) {
        response = await ApiService.getSearch1(searchValue); // getKids1 메서드 호출
      } else {
        response = await ApiService.getSearch2(searchValue); // getKids2 메서드에 categoryWord 전달
      }
      const data = response.data;
      setMovie(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  if (searchValue === "") {
    return (
      <div className="mx-44 mt-5 text-gray-300">
        <h1>검색어를 입력해주세요</h1>
        <Helload />
      </div>
    );
  } else {
    return (
      <div className=" mx-28 mt-5 text-gray-300">
        <h1>
          검색 결과: {searchValue}
          <div className="flex flex-wrap gap-4 my-5">
            {movies.map((movie, index) => (
              <div
                key={index}
                className="sm:w-1/2 md:w-1/2 lg:w-[16.5%] xl:w-[15%] mb-5 transition transform duration-500 ease-in-out "
              >
                <Link
                  to={`/detail/${movie.id}`}
                  className="rounded-lg overflow-hidden block"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.imgpath}`}
                    className="rounded-md w-full shadow-[0px_0px_0px_3px_rgba(0,0,0,0.3)] transition transform duration-500 ease-in-out hover:scale-110 "
                    onError={(e) => (e.currentTarget.src = noImage)}
                    style={{ height: "350px" }}
                  />
                </Link>
                <div className="text-gray-300 text-[18px] mt-2 text-center">
                  {movie.name}
                </div>
              </div>
            ))}
          </div>
        </h1>
      </div>
    );
  }
}

export default Search;

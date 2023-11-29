import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import noImage from "../images/noimage.png";
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
      const url = `http://13.125.242.196/contents/${searchValue}`;
      const response = await axios.get(url);
      const data = response.data;
      setMovie(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  if (searchValue === "") {
    return <h1 className="mx-44 mt-5">검색어를 입력해주세요</h1>;
  } else {
    return (
      <div className="mx-44 mt-5">
        <h1>
          검색 결과: {searchValue}
          <div className="flex flex-wrap justify-between my-5">
            {movies.map((movie, index) => (
              <div
                key={index}
                className="w-[23.5%]  sm:w-1/2 md:w-1/2 lg:w-[24%] xl:w-[23.5%]  hover:scale-105"
              >
                <Link to={`/detail/${movie.name}`} className="">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.imgpath}`}
                    className=" rounded-md w-full"
                    onError={(e) => (e.currentTarget.src = noImage)}
                    style={{height:"450px"}}
                  />
                </Link>
                <h3 className="text-black">{movie.name}</h3>
                <p className="text-base">{movie.smallcategory}</p>
              </div>
            ))}
          </div>
        </h1>
      </div>
    );
  }
}

export default Search;

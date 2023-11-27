import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";

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
  return (
    <div className="mx-44 mt-5">
      <h1>
        검색 결과: {searchValue}
        {movies.map((movie, index) => (
          <div key={index}>
            <Link to={`/detail/${movie.name}`}>
              <h3>{movie.name}</h3>
            </Link>

            <p className=" text-xs">{movie.smallcategory}</p>
          </div>
        ))}
      </h1>
    </div>
  );
}

export default Search;

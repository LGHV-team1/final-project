import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Search() {

  const searchValue = useSelector((state) => state.search.value);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchWord = queryParams.get("searchWord");
  const [movie, setMovie] = useState({})
  useEffect(() => {
    if (searchWord) {
      getData()
  }}, [searchWord]);

  const getData = async () => {
    try {
      const url = `http://3.34.50.51/contents/${searchWord}/detail/`;
      const response = await axios.get(url);
      const data = response.data;
      setMovie(data)
    } catch (err) { 
      console.error(err);
    }
  };
  return <div className="mx-44 mt-5"><h1>{searchWord}</h1></div>;
}

export default Search;

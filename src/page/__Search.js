import React, { useEffect, useState } from "react";
import Helload from "../components/Helload";
import ApiService from "../api/ApiService";
import ShowData from "../components/ShowData";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const isChoseongOnly = (string) => {
  return /^[ㄱ-ㅎ]+$/g.test(string);
};

function Search() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("searchWord");
  const searchDebounceValue = useSelector((state) => state.search.value);
  console.log(searchValue)
  const [visiblevodData1, setVisiblevodData1] = useState([]);
  const [visiblevodData2, setVisiblevodData2] = useState([]);
  const [isShow1, setIsShow1] = useState(true);
  const [isShow2, setIsShow2] = useState(true);
  const itemsPerpage = 12;
  const [movies, setMovie] = useState([]);
  const [actormovies, setActorMovie] = useState([]);
  useEffect(() => {
    if (searchValue) {
     getData()
    }
  }, [searchValue]);
  useEffect(() => {
    setVisiblevodData1(movies.slice(0, itemsPerpage));
  }, [movies]);
  useEffect(() => {
    // 남은 데이터가 없을 경우 isShow를 false로 설정
    if ((movies.length - visiblevodData1.length) <= 0) {
      setIsShow1(false);
    } else {
      setIsShow1(true);
    }
  }, [visiblevodData1, searchValue]);

  useEffect(() => {
    // 남은 데이터가 없을 경우 isShow를 false로 설정
    if ((actormovies.length - visiblevodData2.length) <= 0) {
      setIsShow2(false);
    } else {
      setIsShow2(true);
    }
  }, [visiblevodData2, searchValue]);
  useEffect(() => {
    setVisiblevodData2(actormovies.slice(0, itemsPerpage));
  }, [actormovies]);
  const getData = async () => {
    try {
      let response;
      let responseactor;
      if (isChoseongOnly(searchValue)) {
        response = await ApiService.getSearch1(searchValue); //초성검색
      } else {
        response = await ApiService.getSearch2(searchValue); //제목검색
        responseactor = await ApiService.getSearch3(searchValue); //인물검색
      }
      setMovie(response.data);
      setActorMovie(responseactor.data);
      console.log(response.data);
      console.log(responseactor.data);
    } catch (err) {
      console.error(err);
    }
  };  
  const handleShowMorevodData1 = () => {
    const newDataToShow = movies.slice(
      visiblevodData1.length,
      visiblevodData1.length + itemsPerpage
    );
    setVisiblevodData1([...visiblevodData1, ...newDataToShow]);
  };
  const handleShowMorevodData2 = () => {
    const newDataToShow = actormovies.slice(
      visiblevodData2.length,
      visiblevodData2.length + itemsPerpage
    );
    setVisiblevodData2([...visiblevodData2, ...newDataToShow]);
  };
  if (searchValue === null) {
    return (
      <div className="mx-28 mt-5 text-gray-300">
        <h1>검색어를 입력해주세요</h1>
        <Helload />
      </div>
    );
  } else {
    return (
      <div className="mx-28  mt-5 text-gray-300">
        <h1>검색 결과 : {searchValue}</h1>
        <div className="mt-5 font-bold">
          <h3>제목 검색</h3>
          {movies.length === 0 ? (
            <p className="text-lg"> 제목 검색 결과가 없습니다</p>
          ) : (
            <ShowData
              data={visiblevodData1}
              handleShow={handleShowMorevodData1}
              isShow={isShow1}
            />
          )}
        </div>
        <div className="my-5 pb-10 font-bold">
          <h3>인물 검색</h3>
          {actormovies.length === 0 ? (
            <p className="text-lg"> 인물 검색 결과가 없습니다</p>
          ) : (
            <ShowData
              data={visiblevodData2}
              handleShow={handleShowMorevodData2}
              isShow={isShow2}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Search;

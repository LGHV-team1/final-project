import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import MiniSlide from "../components/MiniSlide";

function Kids() {
  const detailcategory = useSelector((state) => state.category.value);
  const { category } = useParams();
  console.log(detailcategory);
  console.log(category);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryWord = searchParams.get("category");
  const [kids, setKids] = useState([]);
  console.log(categoryWord);
  const getData = async () => {
    let url; 
    if (categoryWord === null) {
      url = `http://loadbalancer-464990516.ap-northeast-2.elb.amazonaws.com/contents/category/kids/`; // url에 값을 할당
    } else {
      url = `http://loadbalancer-464990516.ap-northeast-2.elb.amazonaws.com/contents/category/kids/${categoryWord}`; // url에 값을 할당
    }
    try {
      
      const response = await axios.get(url);
      const data = response.data;
      console.log(data);
      setKids(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, [categoryWord]);

  if (categoryWord === null) {
  return (
    <div className=" mx-44  ">
        <div className="">
          <div className="">
            <h1 className="my-10">영화 인기 TOP5</h1>
            <MiniSlide data={kids}/>
          </div>
          <div className="text-center mt-3"></div>
        </div>
      </div>

  )
} else {
  return <div>small</div>
}
}

export default Kids
import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
function ShowData({ data, handleShow, isShow }) {
  const BASE_URL = "https://image.tmdb.org/t/p/w500";
  const BASE_URL_NO = "https://i.ibb.co/7pYHFY3";
  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {data.map((item, idx) => (
          <div
            key={idx}
            className=" sm:w-1/2 md:w-1/2 lg:w-[18.5%] xl:w-[15.3%] mb-5"
          >
            <Link
              to={`/detail/${item.id}`}
              className="rounded-lg overflow-hidden block"
            >
              <img
                src={
                  item.imgpath === "/noimage.png"
                    ? `${BASE_URL_NO}${item.imgpath}`
                    : `${BASE_URL}${item.imgpath}`
                }
                className="rounded transition transform duration-500 ease-in-out hover:scale-110"
                style={{ height: "350px" }}
              />
            </Link>
            <div className="text-gray-300 text-[18px] text-center">
              {item.name}
            </div>
          </div>
        ))}
      </div>
      {isShow ? <Button onClick={handleShow} label={"더보기"} /> : <></>}
    </div>
  );
}

export default ShowData;
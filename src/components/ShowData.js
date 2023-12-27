import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
function ShowData({ data, handleShow, isShow = true }) {
  const BASE_URL = "https://image.tmdb.org/t/p/w500";
  const BASE_URL_NO = "https://i.ibb.co/7pYHFY3";
  return (
    <div>
      <div className="grid  sm:grid-cols-4  xl:grid-cols-6  gap-4">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="  mb-5 text-center "
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
                style={{ height: "350px", width:"250px"}}
              />
            </Link>
            <div className="text-gray-300 text-[18px] ">
              {item.name}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
      {isShow ? <Button onClick={handleShow} label={"더보기"} className="text-white animate-bounce bg-my-color mb-3 py-2 px-3 rounded"/> : <></>}
      </div>
    </div>
  );
}

export default ShowData;

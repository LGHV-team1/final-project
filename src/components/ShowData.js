import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import noImage from "../images/noimage.png";
import Button from "./Button";
function ShowData({ data, handleShow }) {
  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="w-[18.5%]  sm:w-1/2 md:w-1/2 lg:w-[18.5%] xl:w-[18.5%] mb-5"
          >
            <Link to={`/detail/${item.id}`} className="rounded-lg overflow-hidden block">
              <img
                src={`https://image.tmdb.org/t/p/w500/${item.imgpath}`}
                className="rounded transition transform duration-500 ease-in-out hover:scale-110"
                onError={(e) => (e.currentTarget.src = noImage)}
                style={{ height: "400px" }}
              />
            </Link>
            <div className="text-gray-600 text-[18px] text-center">{item.name}</div>
          </div>
        ))}
      </div>
      <Button onClick={handleShow} label={"더보기"} />
    </div>
  );
}

export default ShowData;

import React, { useState, useCallback } from "react";
import Rank from "./Rank";
import Button from "./Button";
import { useSelector } from "react-redux";
import { useParams} from "react-router-dom";
import ApiService from "../api/ApiService";

export default function Review() {
  const {name} = useParams();
  const [review, setReview] = useState("");
  const [reviewScore, setReviewScore] = useState(0);
  const rankValue = useSelector((state) => state.rank.value);
  console.log(rankValue);
  const handleScoreChange = useCallback(
    (newScore) => {
      setReviewScore(newScore);
    },
    [reviewScore]
  );
  const onHandlerReview = (e) => {
    setReview(e.target.value);
  };

  const sendReview = async (e) => {
   
    try {
      console.log(review, rankValue)
      const response = await ApiService.postReview(name, review, rankValue);
      console.log(response.data);
      setReview("");
      setReviewScore(0);
    } catch (error) {
      console.error("API 요청 중 오류:", error);
    }
  };

  return (
    <form onSubmit={sendReview} className=" rounded pt-3">
      <div className="w-full mb-4 border-t  border-b border-l border-r border-gray-500 rounded-lg bg-bg-color ">
        <div className="p-4 bg-gray-500-t-lg ">
          <textarea
            id="comment"
            rows="4"
            className="w-full text-gray-400  focus:ring-gray-500 bg-bg-color "
            placeholder="이 작품에 대한 생각을 자유롭게 작성해주세요..."
            required
            onChange={onHandlerReview}
            value={review}
          ></textarea>
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-400 ">
          <Button
            type="submit"
            label={"리뷰 작성"}
            className="py-2 bg-my-color  text-white  hover:bg-my-color/70 rounded px-4"
          />
          <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
            <Rank onScoreChange={handleScoreChange} />
          </div>
        </div>
      </div>
    </form>
  );
}

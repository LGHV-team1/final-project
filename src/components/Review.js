import React, { useState } from "react";
import Input from "./Input";
import Rank from "./Rank";
import Button from "./Button";

export default function Review() {
  const [review, setReview] = useState("");
  const onHandlerReview = (e) => {
    setReview(e.target.value);
  };
  const sendReview = (e) => {
    
  };
  return (
    <form onSubmit={sendReview}>
      <div className="w-full mb-4 border border-gray-200 rounded-px-4 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="p-4 bg-white rounded-t-lg dark:bg-gray-800">
          <textarea
            id="comment"
            rows="4"
            className="w-full   text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="이 작품에 대한 생각을 자유롭게 작성해주세요..."
            required
            onChange={onHandlerReview}
          ></textarea>
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <Button
            type="submit"
            label={"리뷰 작성"}
            className="py-2 bg-my-color  text-white  hover:bg-my-color/70 rounded px-4"
          />
          <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
            <Rank />
          </div>
        </div>
      </div>
    </form>
  );
}

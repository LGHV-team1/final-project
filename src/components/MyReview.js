import React, { useEffect, useState } from "react";
import axios from "axios";
import ApiService from "../api/ApiService";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";
function MyReview() {
  const BASE_URL = "https://image.tmdb.org/t/p/original";
  const BASE_URL_NO = "https://i.ibb.co/7pYHFY3";
  const [reviewList, setReviewList] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editedPayload, setEditedPayload] = useState(""); // 수정된 페이로드를 저장하는 상태
  const [editedRating, setEditedRating] = useState(0);
  const FilledStar = () => (
    <FaStar className="fill-my-color text-3xl inline-block mb-2" />
  );
  const EmptyStar = () => (
    <FaStar className="fill-gray-400 text-3xl inline-block mb-2" />
  );

  function renderStars(rating) {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<FilledStar key={`filled_${i}`} />);
    }
    for (let i = rating; i < 5; i++) {
      stars.push(<EmptyStar key={`empty_${i}`} />);
    }
    return stars;
  }
  useEffect(() => {
    ApiService.getMyreview().then((response) => {
      setReviewList(response.data.reverse());
      console.log(response.data);
    });
  }, [reviewList.id]);

  const startEditing = (review) => {
    setEditingReviewId(review.id);
    setEditedPayload(review.payload);
    setEditedRating(review.rating);
  };

  const handlePayloadChange = (event) => {
    setEditedPayload(event.target.value);
  };
  const handleRatingChange = (event) => {
    setEditedRating(event.target.value);
  };
  const saveEditedReview = (id) => {
    ApiService.changeReview(id, editedPayload, editedRating)
      .then(function (response) {
        // handle success
        alert("수정되었습니다");
        console.log(response);
        window.location.replace("/mypage");
        setEditingReviewId(null);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteReview = (id) => {
    ApiService.deleteReview(id)
      .then(function (response) {
        // handle success
        alert("삭제 완료");
        window.location.replace("/mypage");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="text-center mb-10">
      <div className="block text-end mb-1 text-gray-300">
        총 {reviewList.length}건
      </div>
      {reviewList.length === 0 ? (
        <p>작성한 리뷰가 없습니다.</p>
      ) : (
        reviewList.map((a) => (
          <div key={a.id} className="flex  py-4 border-b border-gray-600 ">
            <div className="w-1/5">
              <Link to={`/detail/${a.contents}`}>
                <img
                  src={
                    a.vodimg === "/noimage.png"
                      ? `${BASE_URL_NO}${a.vodimg}`
                      : `${BASE_URL}${a.vodimg}`
                  }
                  style={{
                    objectFit: "cover",
                    width: "200px",
                    height: "300px",
                  }}
                  className=" hover:opacity-50 rounded-md"
                />
              </Link>
            </div>
            <div className="w-4/5 flex-col">
              <div className="flex justify-between">
                <Link
                  to={`/detail/${a.contents}`}
                  className="text-gray-200 text-3xl w-80 float-left text-left font-medium hover:text-gray-600 no-underline"
                >
                  {a.vodname}
                </Link>
                <div className="text-gray-200">
                  <p className=" inline-block mr-2">평점</p>
                  <p className="inline-block mr-2">{renderStars(a.rating)}</p>
                  {editingReviewId === a.id ? (
                    <select
                      value={editedRating}
                      onChange={handleRatingChange}
                      className="inline-block mr-2 p-1 border border-gray-300 rounded-lg bg-gray-50 sm:text-lg text-black"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className=" inline-block mr-5"> {a.rating}점</p>
                  )}

                  {editingReviewId === a.id ? (
                    <button
                      className=" rounded-lg px-2 py-1 mr-1 hover:text-my-color"
                      onClick={() => saveEditedReview(a.id)}
                    >
                      저장
                    </button>
                  ) : (
                    <button
                      className=" rounded-lg px-2 py-1 mr-1 hover:text-my-color"
                      onClick={() => startEditing(a)}
                    >
                      수정
                    </button>
                  )}
                  <button
                    className=" rounded-lg px-2 py-1 hover:text-my-color"
                    onClick={() => deleteReview(a.id)}
                  >
                    삭제
                  </button>
                </div>
              </div>
              <div className="w-4/5 flex text-gray-400">
                {editingReviewId === a.id ? (
                  <textarea
                    type="text"
                    rows="3"
                    value={editedPayload}
                    onChange={handlePayloadChange}
                    className="w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-300 sm:text-lg"
                  />
                ) : (
                  <p className="text-lg ">{a.payload}</p>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyReview;

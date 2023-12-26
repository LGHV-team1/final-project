import React, { useEffect, useState } from "react";
import ApiService from "../api/ApiService";
import { FaStar } from "react-icons/fa6";

function ViewReview(props) {
  const [VODreviewList, setVODReviewList] = useState([]);

  const FilledStar = () => (
    <FaStar className="fill-my-color text-3xl inline-block mb-2" />
  );
  const EmptyStar = () => (
    <FaStar className="fill-gray-400 text-3xl inline-block mb-2" />
  );

  const maskUsername = (username) => {
    if (username.length > 5) {
      const start = username.substring(0, 2);
      const end = username.substring(username.length - 3);
      const masked = "*".repeat(username.length - 5);
      return `${start}${masked}${end}`;
    }
    return username; // 이름이 짧은 경우에는 마스킹하지 않음
  };

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
    ApiService.getVodReview(props.name).then((response) => {
      setVODReviewList(response.data.reverse());
      console.log(response.data);
    });
  }, [VODreviewList.id]);

  return (
    <div className="text-center mb-10 text-gray-200">
      <div className="block text-end mb-1 ">총 {VODreviewList.length}건</div>
      {VODreviewList.length === 0 ? (
        <p>작성된 리뷰가 없습니다.</p>
      ) : (
        VODreviewList.map((a) => (
          <div key={a.id} className="mb-4">
            <hr className="text-center mb-4"></hr>
            <div className="m-auto">
              <div className="block mt-3">
                <div className="text-xl inline-block w-80 float-left text-left font-medium">
                  {maskUsername(a.username)}
                </div>
                <div className="text-end">
                  <div className="inline-block mb-[3px]">
                    <p className="text-xl inline-block mr-2">평점</p>
                    <p className="inline-block mr-2">{renderStars(a.rating)}</p>
                    <p className="text-xl inline-block"> {a.rating}점</p>
                  </div>
                </div>
              </div>
              <div className="text-left">
                <p className="text-lg inline-block">{a.payload}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ViewReview;

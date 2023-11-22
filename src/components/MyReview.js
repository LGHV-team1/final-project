import React, { useEffect, useState } from "react";
import axios from "axios";
import ApiService from "../api/ApiService";
import { FaStar } from "react-icons/fa6";


function MyReview() {
    const [reviewList, setReviewList] = useState([]);
    const FilledStar = () => <FaStar className="fill-my-color text-3xl inline-block mb-2" />;
    const EmptyStar = () => <FaStar className="fill-gray-400 text-3xl inline-block mb-2" />;
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
        ApiService.getMyreview()
        .then(response => {
            setReviewList(response.data.reverse());
            console.log(response.data)
        })
    }, []);
    
    let reviewcount = reviewList.length;
    const deleteReview = (id) => {
        axios.delete(`http://localhost:8000/review/myreview/delete/${id}`)
            .then(function (response) {
                // handle success
                alert("삭제 완료")
                window.location.replace("/mypage")
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    return(
        <div className="text-center">
            <div className="block text-end mb-1" >총 {reviewcount}건</div>
            {reviewList.map((a)=>(
                <div key={a.id} className="mb-4">
                    <hr className="text-center mb-4"></hr>
                    <div className="m-auto" >
                        <div className="block mt-3">
                            <div className="text-2xl inline-block w-80 float-left text-left font-medium">{a.vodname}</div>
                            <div className="text-end">
                                <div className="inline-block mb-[3px]">
                                    <p className="text-xl inline-block mr-2">평점</p>
                                    <p className="inline-block mr-2">{renderStars(a.rating)}</p>
                                    <p className="text-xl inline-block mr-5"> {a.rating}점</p>
                                </div>
                                <div className="inline-block">
                                    <button className="border-solid border-[1px] rounded-lg px-2 py-1 mr-1">수정</button>
                                    <button className="border-solid border-[1px] rounded-lg px-2 py-1">삭제</button>
                                </div>
                            </div>
                        </div>
                    
                        <div className="text-left">
                            <p className="text-lg inline-block">{a.payload}</p>
                        </div>

                    </div>
                </div>
            )
            )}
        </div>
    )
}

export default MyReview;
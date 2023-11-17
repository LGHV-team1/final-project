import React, { useEffect, useState } from "react";
import axios from "axios";

function MyReview() {
    const [reviewList, setReviewList] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:8000/review/myreview")
        .then(response => {
            setReviewList(response.data);
            console.log(response.data)
        })
    }, []);
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
        <div>
            {reviewList.map((a)=>(
                <div key={a.id} >
                        <div className="review">
                            <p>{a.contents.name}</p>
                            <p>{a.payload}</p>
                            <p>{a.rating}</p>
                        </div>
                </div>
            )
            )}








        </div>
    )
}
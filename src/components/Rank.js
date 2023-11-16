import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const ARRAY = [0, 1, 2, 3, 4];

function Rank() {
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [hovered, setHovered] = useState([false, false, false, false, false]);
  const [score, setScore] = useState(0);
  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  useEffect(() => {
    let score =
      clicked.filter(Boolean).length || hovered.filter(Boolean).length;

    setScore(score);
    sendReview();
  }, [clicked, hovered]); //컨디마 컨디업

  const sendReview = () => {
    let score = clicked.filter(Boolean).length;
    // fetch('http://52.78.63.175:8000/movie', {
    //   method: 'POST',
    //   Headers: {
    //     Authroization: 'e7f59ef4b4900fe5aa839fcbe7c5ceb7',
    //   },
    //   body: JSON.stringify({
    //     movie_id:1
    //     star: score,
    //   }),
    // });
  };

  return (
    <>
      <div className="flex">
      
        {ARRAY.map((el, idx) => {
          return (
            <div>
              <FaStar
                key={idx}
                size="50"
                onClick={() => handleStarClick(el)}
                onMouseEnter={() => {
                  let hoverStates = [{ ...hovered }];
                  for (let i = 0; i < 5; i++) {
                    hoverStates[i] = i <= el ? true : false;
                  }
                  setHovered(hoverStates);
                }}
                onMouseLeave={() =>
                  setHovered([false, false, false, false, false])
                }
                style={{
                  color: hovered[el] || clicked[el] ? "#C62A5B" : "#555",
                }}
              />
            </div>
          );
        })}
        {score === 0 ? "" : score}
      </div>
      
    </>
  );
}

export default Rank;
